const database = require('./db')


exports.getUsers = async() => {
    const users = await database.select().from('users')
    return users
};

exports.getUserById = async(user_id) => {
    const users = await database.select().from('users').where('user_id', user_id)
    return users
};

exports.createUser = async(user_id, name, last_name) => {
    const user = await database('users').insert({user_id, name, last_name}).returning('*')
    return user
};