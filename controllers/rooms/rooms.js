const { createNewRoom, getRoomData, getAllRooms } = require('../../dao/interface');


exports.getRooms = async(req, res) => {
    const response = await getAllRooms()
    return response
};

exports.getRoomByID = async(req, res) => {
    const room_id = req.query.room_id ? req.query.room_id : "0"
    const response = await getRoomData(room_id)
    return response
};

exports.createRoom = async(req, res) => {
    const room_id = req.body.room_id ? req.body.room_id : "0"
    const end_time = req.body.end_time ? req.body.end_time : ""

    const validParams = validateParams(room_id, end_time)
    if (validParams == false) {
        return {'valid': false, 'message': 'Error processing params', status: 400}
    }
    
    const roomsWithThisID = await getRoomData(room_id)
    if (roomsWithThisID.length > 0) {
        return {'valid': false, 'message': 'Room already exists in database', status: 400}
    }

    const response = await createNewRoom(room_id, end_time)
    return {'response': response, 'valid': true}
};

const validateParams = (room_id, end_time) => {
    const validRoomID = room_id == "0" ? false : true
    const validEndTime = end_time == "" ? false : true
    return validRoomID && validEndTime
}