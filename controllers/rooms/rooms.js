const votingService = require('../../server/service/VotingPlatformService')
const {createRoom, getAllRooms, getRoomById, getRoomByListId, getAllRoomsNotReadyForReview, markRoomAstReadyForReview, getReviewersByUserId, createReviews, getReviewsByRoomAndList, deleteReviewsByRoom, markRoomAsReady, getListsByRoomId} = require('../../dao/interface')

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

exports.showAllRoomsReadyForReview = async(req, res) => {
    const user_id = req.params.id ? req.params.id : ""
    let response = []
    const reviewerListResponse = await getReviewersByUserId(user_id)
    const list_id = reviewerListResponse[0].list_id
    const roomListResponse = await getRoomByListId(list_id)
    for (roomList of roomListResponse) {
        const roomDetail = await getRoomById(roomList.room_id)
        if ((roomDetail[0].ready == 'false') && (roomDetail[0].ready_for_review == 'true')){
            const reviewsResponse = await getReviewsByRoomAndList(roomDetail[0].room_id, list_id)
            if (reviewsResponse.length === 0){
                let currentRoom = {room_id: roomDetail[0].room_id, name: roomDetail[0].description, initDate: makeReadableDate(roomDetail[0].init_date), endDate: makeReadableDate(roomDetail[0].end_date)}
                response.push(currentRoom)
            }
        }
    }

    return response
}

exports.updateRoomForReview = async(req, res) => {
    const room_id = req.params.id ? req.params.id : ""
    const response = await markRoomAstReadyForReview(room_id)
    await deleteReviewsByRoom(room_id)
    return response
}

exports.updateRoomForReady = async(req, res) => {
    const room_id = req.params.id ? req.params.id : ""
    const reviewerListResponse = await getReviewersByUserId(req.session.user_id)
    const list_id = reviewerListResponse[0].list_id
    await createReviews(room_id, list_id)
    
    let ready = await roomIsAlreadyReady(room_id)
    if (ready == 'true') {
        await markRoomAsReady(room_id)
    }

    return {}
}

const roomIsAlreadyReady = async(room_id) => {
    const listsOfRoom = await getListsByRoomId(room_id)
    for (const roomList of listsOfRoom) {
        const review = await getReviewsByRoomAndList(room_id, roomList.list_id)
        if (review.length === 0) {
            return 'false'
        }
    }
    return 'true'
}

const makeReadableDate = (date) => {
    const dateHour = date.split('T')
    const dateProcessed = dateHour[0].split('-')
    const hourProcessed = dateHour[1].split(':')

    return dateProcessed[2]+ '/' + dateProcessed[1] + '/' + dateProcessed[0] + ' ' + hourProcessed[0] + ':' + hourProcessed[1]
}