const {getUserByUserId, getRoleByID} = require('../../dao/interface');
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
        req.session.loggedIn = true
        req.session.user_id = usersWithThisId[0].user_id
        req.session.dni = usersWithThisId[0].dni
        const userRole = await getRoleByID(usersWithThisId[0].user_id)
        if (userRole.length != 0 && userRole[0] && userRole[0].role) {
            req.session.role = userRole[0].role
        } else {
            req.session.role = 'normal'
        }

        return {'valid': true, 'response': 'Log in successful', status: 200}
    }

    return {'valid': false, 'message': 'Invalid user or password', status: 400}
};