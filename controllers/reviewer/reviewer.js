const {getAllReviewers, getReviewersByList, getUserById, getRoleByID, updateRole, getListsData, createReviewer, deleteReviewer} = require('../../dao/interface');

exports.getReviewers = async(req, res) => {
    const response = await getAllReviewers()
    return response
};

exports.getReviewersByListId = async(req, res) => {
    const list_id = req.query.list_id ? req.query.list_id : "0"
    const response = await getReviewersByList(list_id)
    return response
};

exports.createReviewer = async(req, res) => {
    const user_id = req.body.newReviewer ? req.body.newReviewer : "0"
    if (user_id == "0") {
        return {'valid': false, 'message': 'Error processing params', status: 400}
    }

    const list_id = req.body.listId ? req.body.listId : "0"
    if (list_id == "0") {
        return {'valid': false, 'message': 'Error processing params', status: 400}
    }

    const userFound = await getUserById(user_id)
    if (userFound.length <= 0) {
        return {'valid': false, 'message': 'User does not exists in database', status: 400}
    }
    const user = userFound[0].user_id;

    const role = await getRoleByID(user)
    if (role.length <= 0) {
        return {'valid': false, 'message': 'User does not have any role', status: 400}
    }

    if (role[0].role !== 'normal') {
        return {'valid': false, 'message': 'User is already admin or reviewer', status: 400}
    }

    const list = await getListsData(list_id)
    if (list.length <= 0) {
        return {'valid': false, 'message': 'List does not exists', status: 400}
    }
    
    const response = await updateRole(user, 'reviewer')
    const response2 = await createReviewer(user, list_id)

    return {'message': response, 'message2': response2, 'valid': true, status: 200}
}

exports.deleteReviewer = async(req, res) => {
    const user_id = req.body.reviewer ? req.body.reviewer : "0"
    if (user_id == "0") {
        return {'valid': false, 'message': 'Error processing params', status: 400}
    }

    const userFound = await getUserById(user_id)
    if (userFound.length <= 0) {
        return {'valid': false, 'message': 'User does not exists in database', status: 400}
    }
    const user = userFound[0].user_id;

    const role = await getRoleByID(user)
    if (role.length <= 0) {
        return {'valid': false, 'message': 'User does not have any role', status: 400}
    }

    if (role[0].role !== 'reviewer') {
        return {'valid': false, 'message': 'User is not a reviewer', status: 400}
    }

    const response = await updateRole(user, 'normal')
    await deleteReviewer(user)

    return {'message': response, 'valid': true, status: 200}
}