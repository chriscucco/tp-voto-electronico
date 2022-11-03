const {getRoomAndUser, getInfoByRoomAndListId, getUserIDAndRoomFromRegisteredVotes, getRoomById, registerUserAndRoom} = require('../../dao/interface');
const {getRoomProcessedData} = require('../my_rooms/my_rooms')
const votingService = require('../../server/service/VotingPlatformService')


exports.processVote = async(req, res) => {
    const roomId = req.params.roomId ? req.params.roomId : ""
    const listId = req.params.listId ? req.params.listId : ""
    const userId = req.session.user_id

    
    const userVoted = await getUserIDAndRoomFromRegisteredVotes(roomId, userId)
    const roomList = await getInfoByRoomAndListId(roomId, listId)
    const voter = await getRoomAndUser(roomId, userId)
    const currentRoom = await getRoomById(roomId)
    const roomInfo = await getRoomProcessedData(currentRoom[0], userId)
    
    if (voter.length == 0) {
        return {'data': 'El usuario no puede votar en esta sala', status: 400}
    }

    if (roomList.length == 0) {
        return {'data': 'La lista no participa de esta sala', status: 400}
    }
    
    if (userVoted.length > 0) {
        return {'data': 'Usuario ya votó en la sala', status: 400}
    }

    if ((roomInfo.expired) || (!roomInfo.started) || (roomInfo.userVoted)){
        return {'data': 'La sala no está disponible para votar', status: 400}
    }


    await registerUserAndRoom(userId, roomId)

    const response = await votingService.vote(roomId, listId, userId)

    return {'data': 'ok', status: 200}
};

exports.countVotes = async(req, res) => {
    const roomId = req.params.roomId ? req.params.roomId : ""
    const response = await votingService.getVotesByRooms(roomId)
    // COMPLETAR
    return {'data': 'ok', status: 200}
}