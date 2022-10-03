const {getRoomsByUserId, getRoomById, registerUserAndRoom} = require('../../dao/interface');

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
            const votesByUser = await registerUserAndRoom(userId, room.room_id)

            let userVoted = (votesByUser.length > 0)
            let timeNow = new Date
            let started = validateIfDatePassed(currentRoom[0].init_date, timeNow.toISOString())
            let expired =  validateIfDatePassed(currentRoom[0].end_date, timeNow.toISOString())

            processedRoomInfo = {room_id: room.room_id, init_date: currentRoom[0].init_date, end_date: currentRoom[0].end_date, userVoted, started, expired}
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
