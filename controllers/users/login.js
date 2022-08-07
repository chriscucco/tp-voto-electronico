const {getUserByUserId} = require('../../dao/interface');
const {processPassword} = require('./commons')

exports.logInUser = async(req, res) => {
    const user_id = req.body.user_id ? req.body.user_id : "0"
    const password = req.body.password ? req.body.password : ""

    const usersWithThisId = await getUserByUserId(user_id)
    if (usersWithThisId.length == 0) {
        return {'valid': false, 'message': 'Invalid user or password', status: 400}
    }

    const processedPassword = processPassword(password)
    if (usersWithThisId[0].password === processedPassword) {
        return {'valid': true, 'response': 'Log in successful', status: 200}
    }

    return {'valid': false, 'message': 'Invalid user or password', status: 400}
};