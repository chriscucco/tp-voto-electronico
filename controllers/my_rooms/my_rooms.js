const {getRoomsByUserId, getRoomById, getUserIDAndRoomFromRegisteredVotes, getRoomAndUser, getListsByRoomId, getListsData, getCandidatesDataFromList} = require('../../dao/interface');

exports.getRoomsInfoByVoter = async(req, res) => {
    const userId = req.session.user_id
    
    const rooms = await getRoomsByUserId(userId)
    if (rooms.length == 0) {
        return {'data': [], status: 200}
    }

    let roomsInfo = []
    for (const room of rooms) {
        try {
            const currentRoom = await getRoomById(room.room_id)
            const votesByUser = await getUserIDAndRoomFromRegisteredVotes(userId, room.room_id)

            let userVoted = (votesByUser.length > 0)
            let timeNow = new Date
            let started = validateIfDatePassed(currentRoom[0].init_date, timeNow.toISOString())
            let expired =  validateIfDatePassed(currentRoom[0].end_date, timeNow.toISOString())

            processedRoomInfo = {room_id: room.room_id, description: currentRoom[0].description, init_date: currentRoom[0].init_date, end_date: currentRoom[0].end_date, userVoted, started, expired}
            roomsInfo.push(processedRoomInfo)
        } catch(Exception) {}   
    }

    return {'data': roomsInfo, status: 200}    
};

const validateIfDatePassed = (date, timeNow) => {
    let processedData = date.split('T')
    let processedDate = processedData[0].split('-')
    let processedHours = processedData[1].split(':')

    let processedTimeNowInitial = timeNow.split('.')
    let processedTimeNow = processedTimeNowInitial[0].split('T')
    let processedDateTimeNow = processedTimeNow[0].split('-')
    let processedHoursTimeNow = processedTimeNow[1].split(':')

    // Comparing Dates
    if (parseInt(processedDate[0]) < parseInt(processedDateTimeNow[0])) {
        return true
    }

    if (parseInt(processedDate[0]) == parseInt(processedDateTimeNow[0])) {
        if (parseInt(processedDate[1]) < parseInt(processedDateTimeNow[1])) {
            return true
        }

        if (parseInt(processedDate[1]) == parseInt(processedDateTimeNow[1])) {
            if (parseInt(processedDate[2]) < parseInt(processedDateTimeNow[2])) {
                return true
            }
        }
    }

    // Comparing Hours
    if ((parseInt(processedDate[0]) == parseInt(processedDateTimeNow[0])) &&(parseInt(processedDate[1]) == parseInt(processedDateTimeNow[1])) &&(parseInt(processedDate[2]) == parseInt(processedDateTimeNow[2])) ) {
        if (parseInt(processedHours[0]) < (parseInt(processedHoursTimeNow[0]) - 3)){
            return true
        }

        if ((parseInt(processedHours[0]) == parseInt(processedHoursTimeNow[0])) && (parseInt(processedHours[1]) <= parseInt(processedHoursTimeNow[1]))) {
            return true
        }
    }

    return false
}


exports.getRoomsDetails = async(req, res) => {
    const room_id = req.params.id ? req.params.id : ""
    const userId = req.session.user_id
    
    const validRoomData = await validateVotingData(room_id, userId)
    if (!validRoomData.valid) {
        return {'data': validRoomData.msg, status: 400}
    }

    const roomLists = await getListsByRoomId(room_id)
    if (roomLists.length == 0) {
        return {'data': [], status: 200}
    }

    let listData = []
    for (const roomList of roomLists) {
        try {
            const listId = roomList.list_id
            const list = await getListsData(listId)
            const candidates = await getCandidatesDataFromList(listId)
            let processedListInfo = {'name': list[0].name, 'list_id': list[0].list_id, 'candidates': candidates}
            listData.push(processedListInfo)
        } catch(Exception) {}
    }

    return {'data': listData, status: 200}

}

const validateVotingData = async (room_id, userId) => {
    const roomVoter = await getRoomAndUser(room_id, userId)
    if (roomVoter.length == 0) {
        return {'msg': 'User cant access information from this room', valid: false}
    }

    const currentRoom = await getRoomById(room_id)
    const votesByUser = await getUserIDAndRoomFromRegisteredVotes(room_id, userId)

    let timeNow = new Date
    let userVoted = (votesByUser.length > 0)
    let started = validateIfDatePassed(currentRoom[0].init_date, timeNow.toISOString())
    let expired =  validateIfDatePassed(currentRoom[0].end_date, timeNow.toISOString())

    if (userVoted) {
        return {'msg': 'User already voted for the current room', valid: false}
    }

    if (!started) {
        return {'msg': 'Room is not avaliable for voting yet', valid: false}
    }

    if (expired) {
        return {'msg': 'Room finished, user cant vote', valid: false}
    }

    return {valid: true}

}