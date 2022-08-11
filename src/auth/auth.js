var crypto = require('crypto');

const algorithm = 'aes-256-cbc'; //Using AES encryption
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

exports.processToken = (token) => {
    let cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(token, "utf-8", "hex");
    encrypted += cipher.final("hex");
    return encrypted;
}

exports.processTokenDecrypt = (data) => {
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    let decryptedData = decipher.update(data, "hex", "utf-8");
    decryptedData += decipher.final("utf8");
    return decryptedData;
}