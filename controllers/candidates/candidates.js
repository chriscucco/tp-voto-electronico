const {createNewCandidate, getCandidatesFromList, getCandidatesFromListAndRole, getCandidatesByRoles, getCandidatesDataByName, getCandidatesDataByID, getAllCandidates} = require('../../dao/interface');

exports.getAllCandidates = async(req, res) => {
    const response = await getAllCandidates()
    return response
};

exports.getCandidatesByListID = async(req, res) => {
    const list_id = req.query.list_id ? req.query.list_id : "0"
    const response = await getCandidatesFromList(list_id)
    return response
};

exports.getCandidatesByRoles = async(req, res) => {
    const role = req.query.role ? req.query.role : ""
    const response = await getCandidatesByRoles(role)
    return response
};

exports.getCandidatesByID = async(req, res) => {
    const candidate_id = req.query.candidate_id ? req.query.candidate_id : "0"
    const response = await getCandidatesDataByID(candidate_id)
    return response
};

exports.getCandidatesByName = async(req, res) => {
    const name = req.query.name ? req.query.name : ""
    const response = await getCandidatesDataByName(name)
    return response
};

exports.getCandidatesFromListIDAndRole = async(req, res) => {
    const list_id = req.query.list_id ? req.query.list_id : ""
    const role = req.query.role ? req.query.role : ""

    const response = await getCandidatesFromListAndRole(list_id, role)
    return response
};


exports.createCandidate = async(req, res) => {
    const list_id = req.body.list_id ? req.body.list_id : "0"
    const candidate_id = req.body.candidate_id ? req.body.candidate_id : "0"
    const name = req.body.name ? req.body.name : ""
    const role = req.body.role ? req.body.role : ""

    const validParams = validateParams(list_id, candidate_id, name, role)
    if (validParams == false) {
        return {'valid': false, 'message': 'Error processing params', status: 400}
    }

    const data = await getCandidatesDataByID(candidate_id)
    if (data.length > 0) {
        return {'valid': false, 'message': 'Candidate already exists in database', status: 400}
    }

    const response = await createNewCandidate(list_id, candidate_id, name, role)
    return {'response': response, 'valid': true}

};

const validateParams = (list_id, candidate_id, name, role) => {
    const validListID = list_id == "0" ? false : true
    const validCandidateID = candidate_id == "0" ? false : true
    const validName = name == "" ? false : true
    const validRole = role == "" ? false : true
    return validListID && validCandidateID && validName && validRole
}