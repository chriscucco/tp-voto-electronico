var crypto = require('crypto');

exports.processPassword = (password) => {
    return crypto.createHmac('sha256', 'electronicVoting').update(password).digest('hex')
}