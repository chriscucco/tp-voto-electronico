const { createNewList, getListsData, getListsDataByName, getAllLists, getCandidatesDataFromList} = require('../../dao/interface');

exports.getLists = async(req, res) => {
    const response = await getAllLists()
    return response
};

exports.getListsByID = async(req, res) => {
    const list_id = req.query.list_id ? req.query.list_id : "0"
    const response = await getListsData(list_id)
    return response
};

exports.getListByName = async(req, res) => {
    const name = req.query.name ? req.query.name : ""
    const response = await getListsDataByName(name)
    return response
};

exports.createList = async(req, res) => {
    const list_id = req.body.listId ? req.body.listId : "0"
    const name = req.body.listName ? req.body.listName : ""

    const validParams = validateParams(list_id, name)
    if (validParams == false) {
        return {'valid': false, 'message': 'Error processing params', status: 400}
    }

    const data = await getListsData(list_id)
    if (data.length > 0) {
        return {'valid': false, 'message': 'ListID already exists in database', status: 400}
    }

    const dataName = await getListsDataByName(name)
    if (dataName.length > 0) {
        return {'valid': false, 'message': 'Name already exists in database', status: 400}
    }

    const response = await createNewList(list_id, name)
    return {'message': response, 'valid': true, status: 200}
};

const validateParams = (list_id, name) => {
    const validName = name == "" ? false : true
    const validListID = list_id == "0" ? false : true
    return validName && validListID
}

exports.showAllLists = async(req, res) => {
    const lists = await getAllLists()
    let listData = []
    for (const currentList of lists) {
        try {
            const listId = currentList.list_id
            const list = await getListsData(listId)
            const candidates = await getCandidatesDataFromList(listId)
            const processedCandidates = await processCandidatesLists(candidates)
            let processedListInfo = {'name': list[0].name, 'list_id': list[0].list_id, 'candidates': processedCandidates}
            listData.push(processedListInfo)
        } catch(Exception) {}
    }
    return listData
}


const processCandidatesLists = async(candidates) => {
    let president = []
    let vicepresident = []
    let other = []
    for (const cand of candidates) {
        if (cand.role == "Presidente") {
            president.push(cand)
        } else if (cand.role == "VicePresidente") {
            vicepresident.push(cand)
        } else {
            other.push(cand)
        }
    }

    return {president, vicepresident, other}
}