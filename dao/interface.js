const database = require('./db')

// Users

exports.getUsers = async() => {
    const users = await database.select().from('users')
    return users
};

exports.getUserById = async(dni) => {
    const users = await database.select().from('users').where('dni', dni)
    return users
};

exports.getUserByUserId = async(user_id) => {
    const users = await database.select().from('users').where('user_id', user_id)
    return users
};

exports.createUser = async(user_id, dni, name, last_name, password) => {
    const user = await database('users').insert({user_id, dni, name, last_name, password}).returning('*')
    return user
};


// Roles

exports.getRoles = async() => {
    const roles = await database.select().from('roles')
    return roles
};

exports.getRoleByID = async(user_id) => {
    const roles = await database.select().from('roles').where('user_id', user_id)
    return roles
}

exports.createRole = async(user_id, role) => {
    const result = await database('roles').insert({user_id, role}).returning('*')
    return result
};

exports.updateRole = async(user_id, role) => {
    const result = await database('roles').update('role', role).where('user_id', user_id).returning('*')
    return result
};


// Registered votes

exports.getRegisteredVotes = async() => {
    const roles = await database.select().from('votes')
    return roles
};

exports.getVotingRoomsByUserID = async(user_id) => {
    const roles = await database.select().from('votes').where('user_id', user_id)
    return roles
}

exports.getUserIDByVotingRooms = async(room_id) => {
    const roles = await database.select().from('votes').where('room_id', room_id)
    return roles
}

exports.getUserIDAndRoomFromRegisteredVotes = async(room_id, user_id) => {
    const roles = await database.select().from('votes').where('room_id', room_id).andWhere('user_id', user_id)
    return roles
}

exports.registerUserAndRoom = async(user_id, room_id) => {
    const result = await database('votes').insert({user_id, room_id}).returning('*')
    return result
};

// Lists

exports.createNewList = async(list_id, name) => {
    const result = await database('lists').insert({list_id, name}).returning('*')
    return result
}

exports.getListsData = async(list_id) => {
    const data = await database.select().from('lists').where('list_id', list_id)
    return data
}

exports.getListsDataByName = async(name) => {
    const data = await database.select().from('lists').where('name', name)
    return data
}

exports.getAllLists = async() => {
    const lists = await database.select().from('lists')
    return lists
}

// Candidates

exports.createNewCandidate = async(list_id, candidate_id, name, role) => {
    const result = await database('candidates').insert({list_id, candidate_id, name, role}).returning('*')
    return result
}

exports.getCandidatesFromList = async(list_id) => {
    const data = await database.select().from('candidates').where('list_id', list_id)
    return data
}

exports.getCandidatesDataFromList = async(list_id) => {
    const data = await database.select('candidate_id', 'name', 'role').from('candidates').where('list_id', list_id)
    return data
}

exports.getCandidatesFromListAndRole = async(list_id, role) => {
    const data = await database.select().from('candidates').where('list_id', list_id).andWhere('role', role)
    return data
}

exports.getCandidatesByRoles = async(role) => {
    const data = await database.select().from('candidates').where('role', role)
    return data
}

exports.getCandidatesDataByName = async(name) => {
    const data = await database.select().from('candidates').where('name', name)
    return data
}

exports.getCandidatesDataByID = async(candidate_id) => {
    const data = await database.select().from('candidates').where('candidate_id', candidate_id)
    return data
}

exports.getAllCandidates = async() => {
    const lists = await database.select().from('candidates')
    return lists
}

exports.deleteCandidateByID = async(candidate_id) => {
    await database.del().from('candidates').where('candidate_id', candidate_id)
}

// Voters

exports.addVoterToRoom = async(room_id, user_id) => {
    const result = await database('voters').insert({room_id, user_id}).returning('*')
    return result
}

exports.getRoomsByUserId = async(user_id) => {
    const data = await database.select().from('voters').where('user_id', user_id)
    return data
}

exports.getUsersParticipatingByRoom = async(room_id) => {
    const data = await database.select().from('voters').where('room_id', room_id)
    return data
}

exports.getRoomAndUser = async(room_id, user_id) => {
    const data = await database.select().from('voters').where('user_id', user_id).andWhere('room_id', room_id)
    return data
}

exports.getAllVotersAndRooms = async() => {
    const lists = await database.select().from('voters')
    return lists
}

// Rooms

exports.createRoom = async(room_id, init_date, end_date, description, ready, ready_for_review) => {
    const result = await database('rooms').insert({room_id, init_date, end_date, description, ready, ready_for_review}).returning('*')
    return result
}

exports.getRoomById = async(room_id) => {
    const data = await database.select().from('rooms').where('room_id', room_id)
    return data
}

exports.getAllRooms = async() => {
    const rooms = await database.select().from('rooms')
    return rooms
}

exports.getAllRoomsNotReadyForReview = async() => {
    const rooms = await database.select().from('rooms').where('ready_for_review', 'false')
    return rooms
}

exports.markRoomAsNotReady = async(room_id) => {
    const result = await database('rooms').update('ready', 'false').update('ready_for_review', 'false').where('room_id', room_id).returning('*')
    return result
}

exports.markRoomAstReadyForReview = async(room_id) => {
    const result = await database('rooms').update('ready', 'false').update('ready_for_review', 'true').where('room_id', room_id).returning('*')
    return result
}

exports.markRoomAsReady = async(room_id) => {
    const result = await database('rooms').update('ready', 'true').update('ready_for_review', 'true').where('room_id', room_id).returning('*')
    return result
}


// RoomLists

exports.createRoomList = async(room_id, list_id) => {
    const result = await database('roomLists').insert({room_id, list_id}).returning('*')
    return result
}

exports.getAllRoomLists = async() => {
    const rooms = await database.select().from('roomLists')
    return rooms
}

exports.getRoomByListId = async(list_id) => {
    const data = await database.select().from('roomLists').where('list_id', list_id)
    return data
}

exports.getListsByRoomId = async(room_id) => {
    const data = await database.select().from('roomLists').where('room_id', room_id)
    return data
}

exports.getInfoByRoomAndListId = async(room_id, list_id) => {
    const data = await database.select().from('roomLists').where('list_id', list_id).andWhere('room_id', room_id)
    return data
}

// Reviewers

exports.getAllReviewers = async() => {
    const rooms = await database.select().from('reviewers')
    return rooms
}

exports.getReviewersByList = async(list_id) => {
    const data = await database.select().from('reviewers').where('list_id', list_id)
    return data
}

exports.getReviewersByUserId = async(user_id) => {
    const data = await database.select().from('reviewers').where('user_id', user_id)
    return data
}

exports.getReviewersByListAndUserId = async(user_id, list_id) => {
    const data = await database.select().from('reviewers').where('list_id', list_id).andWhere('user_id', user_id)
    return data
}

exports.createReviewer = async(user_id, list_id) => {
    const result = await database('reviewers').insert({user_id, list_id}).returning('*')
    return result
}

exports.deleteReviewer = async(user_id) => {
    await database.del().from('reviewers').where('user_id', user_id)
}

// Reviews

exports.getAllReviews = async() => {
    const rooms = await database.select().from('reviews')
    return rooms
}

exports.getReviewsByRoomAndList = async(room_id, list_id) => {
    const rooms = await database.select().from('reviews').where('list_id', list_id).andWhere('room_id', room_id)
    return rooms
}

exports.createReviews = async(room_id, list_id) => {
    const result = await database('reviews').insert({room_id, list_id}).returning('*')
    return result
}

exports.deleteReviewsByRoom = async(room_id) => {
    await database.del().from('reviews').where('room_id', room_id)
}