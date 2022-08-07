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


// Registered votes

exports.getRegisteredVotes = async() => {
    const roles = await database.select().from('votes')
    return roles
};

exports.getVotingRoomsByUserID = async(user_id) => {
    const roles = await database.select().from('votes').where('user_id', user_id)
    return roles
}

exports.getUserIDByVotingRooms = async(room) => {
    const roles = await database.select().from('votes').where('room', room)
    return roles
}

exports.registerUserAndRoom = async(user_id, room) => {
    const result = await database('votes').insert({user_id, room}).returning('*')
    return result
};