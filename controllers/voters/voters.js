const { addVoterToRoom, getRoomsByUserId, getUsersParticipatingByRoom, getAllVotersAndRooms, getRoomAndUser, getUserById, getRoomById, markRoomAsNotReady, deleteReviewsByRoom, getUserByUserId } = require('../../dao/interface');

exports.getAllVotersAndRooms = async(req, res) => {
    const response = await getAllVotersAndRooms()
    return response
};

exports.getVotersByRoom = async(req, res) => {
    const room_id = req.query.room_id ? req.query.room_id : "0"
    const response = await getUsersParticipatingByRoom(room_id)
    return response
};

exports.getVotersDetailsByRoom = async(req, res) => {
    const room_id = req.query.room_id ? req.query.room_id : "0"
    const response = await getUsersParticipatingByRoom(room_id)
    let usersResponse = []

    for (const v of response) {
        const user = await getUserByUserId(v.user_id)
        usersResponse.push(user[0])
    }

    return usersResponse.sort((a,b) => a.last_name > b.last_name ? 1 : (a.last_name == b.last_name ? (a.name > b.name ? 1 : -1) : -1))
}

exports.getRoomsByVoter = async(req, res) => {
    const user_id = req.query.user_id ? req.query.user_id : "0"
    const response = await getRoomsByUserId(user_id)
    return response
};

exports.createNewVoter = async(req, res) => {
    const room_id = req.body.room_id ? req.body.room_id : "0"
    const user_id = req.body.user_id ? req.body.user_id : "0"

    const validParams = validateParams(room_id, user_id)
    if (validParams == false) {
        return {'valid': false, 'message': 'Error processing params', status: 400}
    }

    const data = await getRoomAndUser(room_id, user_id)
    if (data.length > 0) {
        return {'valid': false, 'message': 'Room and User combination already exists in database', status: 400}
    }

    const response = await addVoterToRoom(room_id, user_id)
    return {'response': response, 'valid': true}

};

const validateParams = (room_id, user_id) => {
    const validRoomID = room_id == "0" ? false : true
    const validUserID = user_id == "0" ? false : true
    return validRoomID && validUserID
}

exports.addNewVotersGroup = async(req, res) => {
    const room_id = req.body.roomId ? req.body.roomId : "0"
    const voters = req.body.voterIds ? req.body.voterIds : "0"

    const validParams = validateParams(room_id, voters)
    if (validParams == false) {
        return {'valid': false, 'message': 'Error processing params', status: 400}
    }
    
    var processedInput = voters.replace(/\s/g, "")
    var usersArray = processedInput.split(',')

    const roomResponse = await getRoomById(room_id)
    if (roomResponse.length == 0) {
        let msg = 'La sala de votación ' + room_id + ' no está registrada en la base.'
        return {'valid': false, 'message': msg, status: 400}
    }
    
    for (const userId of usersArray) {
        const response = await getUserById(userId)
        if (response.length == 0) {
            let msg = 'El usuario ' + userId + ' no está registrado en la base.'
            return {'valid': false, 'message': msg, status: 400}
        }

        const resp = await getRoomAndUser(room_id, response[0].user_id)
        if (resp.length > 0) {
            let msg = 'El usuario ' + userId + ' ya está registrado en el acto electoral ' + room_id +' .'
            return {'valid': false, 'message': msg, status: 400}
        }
    }

    for (const userId of usersArray) {
        const userData = await getUserById(userId)
        await addVoterToRoom(room_id, userData[0].user_id)
    }

    await markRoomAsNotReady(room_id)
    await deleteReviewsByRoom(room_id)
    return {'valid': true, 'message': 'success', status: 200}
};