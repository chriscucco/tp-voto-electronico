const votingService = require('../../server/service/VotingPlatformService')
const {createRoom, getAllRooms, getRoomById} = require('../../dao/interface')

exports.getAllRooms = async(req, res) => {
    const response = await getAllRooms()
    return response
}

exports.getRoomByID = async(req, res) => {
    const room_id = req.params.id ? req.params.id : ""
    const response = await getRoomById(room_id)
    return response
}


exports.createRoom = async(req, res) => {
    const dates = req.body.dates ? req.body.dates : []
    const validParams = validateParams(dates)
    if (validParams == false) {
        return {'valid': false, 'message': 'Error processing params', status: 400}
    }

    const init_date = dates[0]
    const end_date = dates[1]
    const resp = await votingService.createRoom('title', 'description')
    const response = await createRoom(resp.id, init_date, end_date)
    return {'response': response, 'valid': true, status: 200}
}

const validateParams = (dates) => {
    if (dates.length != 2) {
        return false
    }
    return true
}