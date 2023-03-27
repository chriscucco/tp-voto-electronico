const votingService = require('../../server/service/VotingPlatformService')
const {createRoom, getAllRooms, getRoomById, getAllRoomsNotReadyForReview, markRoomAstReadyForReview} = require('../../dao/interface')

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
    const description = req.body.description ? req.body.description : ""
    const validParams = validateParams(dates, description)
    if (validParams == false) {
        return {'valid': false, 'message': 'Error processing params', status: 400}
    }

    const init_date = dates[0]
    const end_date = dates[1]
    const initDate = processDate(init_date)
    const endDate = processDate(end_date)

    const resp = await votingService.createRoom(description, 'description')
    const response = await createRoom(resp.id, initDate, endDate, description, 'false', 'false')
    return {'response': response, 'message': resp.id, 'valid': true, status: 200}
}

const processDate = (date) => {
    const dates = date.split(':')
    return dates[0]+':'+dates[1]
}

const validateParams = (dates, description) => {
    if (description == "") {
        return false
    }
    
    if (dates.length != 2) {
        return false
    }

    return true
}

exports.showAllRooms = async(req, res) => {
    const rooms = await getAllRooms()
    let response = []

    for (const room of rooms) {
        let currentRoom = {room_id: room.room_id, name: room.description, initDate: makeReadableDate(room.init_date), endDate: makeReadableDate(room.end_date)}
        response.push(currentRoom)
    }
    return response
}

exports.showAllRoomsNotReadyForReview = async(req, res) => {
    const rooms = await getAllRoomsNotReadyForReview()
    let response = []

    for (const room of rooms) {
        let currentRoom = {room_id: room.room_id, name: room.description, initDate: makeReadableDate(room.init_date), endDate: makeReadableDate(room.end_date)}
        response.push(currentRoom)
    }
    return response
}

exports.updateRoomForReview = async(req, res) => {
    const room_id = req.params.id ? req.params.id : ""
    console.log("PROCESING!")
    const response = await markRoomAstReadyForReview(room_id)
    return response
}

const makeReadableDate = (date) => {
    const dateHour = date.split('T')
    const dateProcessed = dateHour[0].split('-')
    const hourProcessed = dateHour[1].split(':')

    return dateProcessed[2]+ '/' + dateProcessed[1] + '/' + dateProcessed[0] + ' ' + hourProcessed[0] + ':' + hourProcessed[1]
}