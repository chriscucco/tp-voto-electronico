const {createRoomList, getAllRoomLists, getInfoByRoomAndListId, getRoomByListId, getListsByRoomId, getListsData, getRoomById} = require('../../dao/interface')
const votingService = require('../../server/service/VotingPlatformService')


exports.getAllRoomLists = async(req, res) => {
    const response = await getAllRoomLists()
    return response
}

exports.getRoomByListId = async(req, res) => {
    const room_id = req.params.id ? req.params.id : ""
    const response = await getRoomByListId(room_id)
    return response
}

exports.getListByRoomId = async(req, res) => {
    const room_id = req.params.id ? req.params.id : ""
    const response = await getListsByRoomId(room_id)
    return response
}


exports.createNewRoomList = async(req, res) => {
    const room_id = req.body.room_id ? req.body.room_id : "0"
    const list_id = req.body.list_id ? req.body.list_id : "0"

    const validParams = validateParams(room_id, list_id)
    if (validParams == false) {
        return {'valid': false, 'message': 'Error processing params', status: 400}
    }
    

    const roomResponse = await getRoomById(room_id)
    if (roomResponse.length == 0) {
        let msg = 'La sala de votación ' + room_id + ' no está registrada en la base.'
        return {'valid': false, 'message': msg, status: 400}
    }

    const response = await getListsData(list_id)
    if (response.length == 0) {
        let msg = 'La lista ' + list_id + ' no está registrada en la base.'
        return {'valid': false, 'message': msg, status: 400}
    }

    const resp = await getInfoByRoomAndListId(room_id, list_id)
    if (resp.length > 0) {
        let msg = 'La lista ' + list_id + ' ya está registrada en el acto electoral ' + room_id +' .'
        return {'valid': false, 'message': msg, status: 400}
    }

    const roomListResponse = await createRoomList(room_id, list_id)
    return {'response': roomListResponse, 'valid': true}

};

exports.addListsToRoom = async(req, res) => {
    const room_id = req.body.roomId ? req.body.roomId : "0"
    const list_id = req.body.listsId ? req.body.listsId : "0"

    const validParams = validateParams(room_id, list_id)
    if (validParams == false) {
        return {'valid': false, 'message': 'Error processing params', status: 400}
    }
    
    var processedInput = list_id.replace(/\s/g, "")
    var listsArray = processedInput.split(',')

    const roomResponse = await getRoomById(room_id)
    if (roomResponse.length == 0) {
        let msg = 'La sala de votación ' + room_id + ' no está registrada en la base.'
        return {'valid': false, 'message': msg, status: 400}
    }
    
    for (const listId of listsArray) {
        const response = await getListsData(listId)
        if (response.length == 0) {
            let msg = 'La lista ' + listId + ' no está registrada en la base.'
            return {'valid': false, 'message': msg, status: 400}
        }

        const resp = await getInfoByRoomAndListId(room_id, response[0].list_id)
        if (resp.length > 0) {
            let msg = 'La lista ' + listId + ' ya está registrada en el acto electoral ' + room_id +' .'
            return {'valid': false, 'message': msg, status: 400}
        }
    }

    for (const listId of listsArray) {
        await createRoomList(room_id, listId)
    }

    const addListResponse = await votingService.addListsToRooms(room_id, listsArray) 
    console.log("/////////ROOMLIST///////////////")
    console.log(addListResponse)

    return {'valid': true, 'message': 'success', status: 200}
}

const validateParams = (room_id, list_id) => {
    const validRoomID = room_id == "0" ? false : true
    const validListID = list_id == "0" ? false : true
    return validRoomID && validListID
}