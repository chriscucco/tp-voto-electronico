const database = require('./db')


exports.getUsers = async() => {
    const users = await database.select().from('users')
    return users
};

exports.getUserById = async(user_id) => {
    const users = await database.select().from('users').where('user_id', user_id)
    return users
};

exports.createUser = async(user_id, name, last_name, password) => {
    const user = await database('users').insert({user_id, name, last_name, password}).returning('*')
    return user
};

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