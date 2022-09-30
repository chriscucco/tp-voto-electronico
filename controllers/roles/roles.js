const { getRoles, getRoleByID, createRole, updateRole, getUserById } = require('../../dao/interface');


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

    const rolesFound = await getRoleByID(user_id)
    if (rolesFound.length > 0) {
        return {'valid': false, 'message': 'User already exists in database', status: 400}
    }

    const response = await createRole(user_id, role)
    return {'response': response, 'valid': true}
}

exports.updateRole = async(req, res) => {
    const user_id = req.body.user_id ? req.body.user_id : "0"
    if (user_id == "0") {
        return {'valid': false, 'message': 'Error processing params', status: 400}
    }

    const rolesFound = await getRoleByID(user_id)
    if (rolesFound.length == 0) {
        return {'valid': false, 'message': 'User does not exists in database', status: 400}
    }

    const response = await updateRole(user_id, 'admin')
    return {'response': response, 'valid': true}
}

exports.updateRoleByUserOrDNI = async(req, res) => {
    const user_id = req.body.newAdmin ? req.body.newAdmin : "0"
    if (user_id == "0") {
        return {'valid': false, 'message': 'Error processing params', status: 400}
    }

    let user;
    const userFound = await getUserById(user_id)
    if (userFound.length > 0) {
        user = userFound[0].user_id;
    } else {
        const rolesFound = await getRoleByID(user_id)
        if (rolesFound.length == 0) {
            return {'valid': false, 'message': 'User does not exists in database', status: 400}
        }
        user = user_id;
    }

    const response = await updateRole(user, 'admin')
    return {'message': response, 'valid': true, status: 200}
}


const validateParams = (user_id, role) => {
    const validUser = user_id == "0" ? false : true
    const validRole = role == "" ? false : true
    return validUser && validRole
}