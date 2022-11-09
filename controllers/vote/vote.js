const {getRoomAndUser, getInfoByRoomAndListId, getUserIDAndRoomFromRegisteredVotes, getRoomById, registerUserAndRoom} = require('../../dao/interface');
const {getRoomProcessedData} = require('../my_rooms/my_rooms')
const votingService = require('../../server/service/VotingPlatformService');
const { keyboard } = require('@testing-library/user-event/dist/keyboard');


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

    const totalVotes = response.length
    var groupedVotes = {}
    for (r of response) {
        const listVoted = r.words[0]
        groupedVotes[listVoted] = groupedVotes[listVoted] || 0
        groupedVotes[listVoted] += 1
    }

    let votes = []
    let groupedVotesMap = new Map(Object.entries(groupedVotes))
    for (var r of groupedVotesMap.entries()) {
        const vote = {'listId': r[0], 'votes': r[1], 'ratio': (r[1] / totalVotes)}
        votes.push(vote)
    }

    votes.sort((a, b) => b.votes - a.votes )
    console.log("///// VOTOS //////")
    console.log(votes)
    // COMPLETAR
    return {'data': votes, status: 200}
}