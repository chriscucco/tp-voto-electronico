const { createNewRoomList, getListsByRooms, getRoomsByLists, getAllRoomLists, getDataByListAndRoom } = require('../../dao/interface');


exports.getRoomLists = async(req, res) => {
    const response = await getAllRoomLists()
    return response
};

exports.getListsByRoomID = async(req, res) => {
    const room_id = req.query.room_id ? req.query.room_id : "0"
    const response = await getListsByRooms(room_id)
    return response
};

exports.getRoomByListID = async(req, res) => {
    const list_id = req.query.list_id ? req.query.list_id : "0"
    const response = await getRoomsByLists(list_id)
    return response
};

exports.createRoomList = async(req, res) => {
    const room_id = req.body.room_id ? req.body.room_id : "0"
    const list_id = req.body.list_id ? req.body.list_id : "0"

    const validParams = validateParams(room_id, list_id)
    if (validParams == false) {
        return {'valid': false, 'message': 'Error processing params', status: 400}
    }

    const data = await getDataByListAndRoom(room_id, list_id)
    if (data.length > 0) {
        return {'valid': false, 'message': 'Room and List combination already exists in database', status: 400}
    }

    const response = await createNewRoomList(room_id, list_id)
    return {'response': response, 'valid': true}

};

const validateParams = (room_id, list_id) => {
    const validRoomID = room_id == "0" ? false : true
    const validListID = list_id == "0" ? false : true
    return validRoomID && validListID
}