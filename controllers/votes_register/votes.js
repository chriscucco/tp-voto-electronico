const {getRegisteredVotes, getVotingRoomsByUserID, getUserIDByVotingRooms, registerUserAndRoom} = require('../../dao/interface')

exports.getRegisteredVotes = async(req, res) => {
    const response = await getRegisteredVotes()
    return response
};

exports.getVotesRegisteredByUserID = async(req, res) => {
    const user_id = req.query.user_id ? req.query.user_id : "0"
    const response = await getVotingRoomsByUserID(user_id)
    return response
};

exports.getUserIDsByVotesRegistered = async(req, res) => {
    const room = req.query.room ? req.query.room : ""
    const response = await getUserIDByVotingRooms(room)
    return response
};

exports.registerUserIDAndRoom = async(req, res) => {
    const user_id = req.body.user_id ? req.body.user_id : "0"
    const room = req.body.room ? req.body.room : ""

    const validParams = validateParams(user_id, room)
    if (validParams == false) {
        return {'valid': false, 'message': 'Error processing params', status: 400}
    }

    const response = await registerUserAndRoom(user_id, room)
    return {'response': response, 'valid': true}
}

const validateParams = (user_id, room) => {
    const validUser = user_id == "0" ? false : true
    const validRoom = room == "" ? false : true
    return validUser && validRoom
}