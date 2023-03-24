const { getUsers, getUserById, getUserByUserId, createUser, createRole } = require('../../dao/interface');
const {isValidUserID} = require('../external/validation')
const {processPassword} = require('./commons')


exports.createUser = async(req, res) => {
    const user_id = req.body.userId ? req.body.userId : ""
    const name = req.body.userFirstName ? req.body.userFirstName : ""
    const last_name = req.body.userLastName ? req.body.userLastName : ""
    const dni = req.body.dni ? req.body.dni : ""
    const password = req.body.password ? req.body.password : ""

    const validParams = validateParams(user_id, dni, name, last_name, password)

    if (validParams == false) {
        return {'valid': false, 'message': 'Error processing params', status: 400}
    }

    const usersWithThisId = await getUserById(dni)
    if (usersWithThisId.length > 0) {
        return {'valid': false, 'message': 'User already exists in database', status: 400}
    }

    const usersWithThisUserName = await getUserByUserId(user_id)
    if (usersWithThisUserName.length > 0) {
        return {'valid': false, 'message': 'User already exists in database', status: 400}
    }

    const isValidUser = await isValidUserID(user_id)
    if (!isValidUser) {
        return {'valid': false, 'message': 'UserId is invalid', status: 400}
    }

    const response = await createUser(user_id, dni, name, last_name, processPassword(password))
    await createRole(user_id, 'normal')
    return {'message': response, 'valid': true, status: 200}
};

exports.getUsers = async(req, res) => {
    const response = await getUsers()
    return response
};

exports.getUserByUserId = async(req, res) => {
    const user_id = req.query.user_id ? req.query.user_id : "0"
    const response = await getUserByUserId(user_id)
    return response
};

const validateParams = (user_id, dni, name, last_name, password) => {
    const validUser = user_id == "" ? false : true
    const validName = name == "" ? false : true
    const validLastName = last_name == "" ? false : true
    const validPassword = password == "" ? false : true
    const validDNI = dni == "" ? false : true
    return validUser && validName && validLastName && validPassword && validDNI
}
