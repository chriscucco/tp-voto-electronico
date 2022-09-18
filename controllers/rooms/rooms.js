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
    const init_date = req.body.init_date ? req.body.init_date : ""
    const end_date = req.body.end_date ? req.body.end_date : ""

    const validParams = validateParams(init_date, end_date)
    if (validParams == false) {
        return {'valid': false, 'message': 'Error processing params', status: 400}
    }

    const resp = await votingService.createProposal('title', 'description', [])
    const response = await createRoom(resp.id, init_date, end_date)
    return {'response': response, 'valid': true}
}

const validateParams = (init_date, end_date) => {
    const validInitDate = init_date == "" ? false : true
    const validEndDate = end_date == "" ? false : true
    return validInitDate && validEndDate
}