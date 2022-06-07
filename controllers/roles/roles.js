const { getRoles, getRoleByID, createRole } = require('../../dao/interface');


exports.getRoles = async(req, res) => {
    const response = await getRoles()
    return response
};

exports.getRoleByID = async(req, res) => {
    const user_id = req.query.user_id ? req.query.user_id : "0"
    const response = await getRoleByID(user_id)
    return response
};

exports.createRole = async(req, res) => {
    const user_id = req.body.user_id ? req.body.user_id : "0"
    const role = req.body.role ? req.body.role : ""

    const validParams = validateParams(user_id, role)
    if (validParams == false) {
        return {'valid': false, 'message': 'Error processing params', status: 400}
    }

    const response = await createRole(user_id, role)
    return {'response': response, 'valid': true}
}

const validateParams = (user_id, role) => {
    const validUser = user_id == "0" ? false : true
    const validRole = role == "" ? false : true
    return validUser && validRole
}