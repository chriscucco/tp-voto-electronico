const {getUserByUserId} = require('../../dao/interface');
const {processPassword} = require('./commons')
const {processToken} = require('./../../src/auth/auth')

exports.logInUser = async(req, res) => {
    const user_id = req.body.user_id ? req.body.user_id : "0"
    const password = req.body.password ? req.body.password : ""

    const usersWithThisId = await getUserByUserId(user_id)
    if (usersWithThisId.length == 0) {
        return {'valid': false, 'message': 'Invalid user or password', status: 400}
    }

    const processedPassword = processPassword(password)
    if (usersWithThisId[0].password === processedPassword) {
        const loginInfo = {
            user_id: usersWithThisId[0].user_id,
            name: usersWithThisId[0].name,
            last_name: usersWithThisId[0].last_name,
            dni: usersWithThisId[0].dni,
            valid: true,
        }
        const tk = processToken(JSON.stringify(loginInfo))
        return {'valid': true, 'response': 'Log in successful', 'loginInfo': tk, status: 200}
    }

    return {'valid': false, 'message': 'Invalid user or password', status: 400}
};