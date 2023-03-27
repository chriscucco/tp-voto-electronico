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
            processedRoomInfo = await this.getRoomProcessedData(room, userId)
            if (processedRoomInfo.ready === 'true') {
                roomsInfo.push(processedRoomInfo)
            }
        } catch(Exception) {}   
    }

    return {'data': roomsInfo, status: 200}    
};

exports.getRoomProcessedData = async (room, userId) => {
    const currentRoom = await getRoomById(room.room_id)
    const votesByUser = await getUserIDAndRoomFromRegisteredVotes(room.room_id, userId)

    let userVoted = (votesByUser.length > 0)
    let timeNow = new Date
    let started = validateIfDatePassed(currentRoom[0].init_date, timeNow.toISOString())
    let expired =  validateIfDatePassed(currentRoom[0].end_date, timeNow.toISOString())

    let description = ""
    let actionName = ""
    if (userVoted && !expired) {
        description = "Votaste en este acto pero aún no están disponibles los resultados"
        actionName = "Detalles"
    } else if (userVoted && expired) {
        description = "Ya podes ver los resultados de la elección"
        actionName = "Resultados"
    } else if (expired) {
        description = "Acto finalizado"
        actionName = "Resultados"
    } else if (started) {
        description = "Ya podés votar en este acto"
        actionName = "Votar"
    } else {
        description = "Aun no comenzó este acto"
        actionName = "Detalles"
    }

    return {
        room_id: room.room_id, 
        title: currentRoom[0].description, 
        description, 
        actionName, 
        init_date: currentRoom[0].init_date, 
        end_date: currentRoom[0].end_date, 
        userVoted, 
        started, 
        expired, 
        ready: currentRoom[0].ready, 
        ready_for_review: currentRoom[0].ready_for_review
    }
}

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
    
    const roomVoter = await getRoomAndUser(room_id, userId)
    if (roomVoter.length == 0) {
        return {'data': 'User cant access information from this room', status: 401}
    }

    const currentRoom = await getRoomById(room_id)
    const processedRoomInfo = await this.getRoomProcessedData(currentRoom[0], userId)

    if (processedRoomInfo.actionName == "Detalles") {
        return {'data': 'information', status: 400}
    }

    if (processedRoomInfo.actionName == "Resultados") {
        return {'data': 'results', status: 400}
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
            const processedCandidates = await processCandidatesLists(candidates)
            let processedListInfo = {'name': list[0].name, 'list_id': list[0].list_id, 'candidates': processedCandidates}
            listData.push(processedListInfo)
        } catch(Exception) {}
    }

    return {'data': {'lists': listData, 'room': processedRoomInfo}, status: 200}
}



exports.getRoomsInfo = async(req, res) => {
    const room_id = req.params.id ? req.params.id : ""
    const userId = req.session.user_id
    
    const roomVoter = await getRoomAndUser(room_id, userId)
    if (roomVoter.length == 0) {
        return {'data': 'User cant access information from this room', status: 401}
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
            const processedCandidates = await processCandidatesLists(candidates)
            let processedListInfo = {'name': list[0].name, 'list_id': list[0].list_id, 'candidates': processedCandidates}
            listData.push(processedListInfo)
        } catch(Exception) {}
    }

    return {'data': listData, status: 200}
}


exports.getRoomsInfoAdmin = async(req, res) => {
    const room_id = req.params.id ? req.params.id : ""

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
            const processedCandidates = await processCandidatesLists(candidates)
            let processedListInfo = {'name': list[0].name, 'list_id': list[0].list_id, 'candidates': processedCandidates}
            listData.push(processedListInfo)
        } catch(Exception) {}
    }

    return {'data': listData, status: 200}
}

const processCandidatesLists = async(candidates) => {
    let president = []
    let vicepresident = []
    let other = []
    for (const cand of candidates) {
        if (cand.role == "Presidente") {
            president.push(cand)
        } else if (cand.role == "VicePresidente") {
            vicepresident.push(cand)
        } else {
            other.push(cand)
        }
    }

    return {president, vicepresident, other}
}
