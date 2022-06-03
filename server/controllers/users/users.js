const { getUsers, getUserById, createUser } = require('../../../dao/interface');


exports.createUser = async(req, res) => {
    const response = await createUser(req.body.user_id, req.body.name, req.body.last_name)
    return response
};

exports.getUsers = async(req, res) => {
    const response = await getUsers()
    return response
};

exports.getUserById = async(req, res) => {
    const response = await getUserById(req.query.user_id)
    return response
};