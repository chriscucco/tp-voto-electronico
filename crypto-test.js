const crypto = require('crypto');

const algorithm = 'aes-256-cbc';
const password = Buffer.allocUnsafe(32);
const iv = Buffer.allocUnsafe(16);

console.log(`Pass: ${password}`)
console.log(`IV: ${iv}`)

const text = "Mensaje super secreto"

const cipher = crypto.createCipheriv(algorithm, password, iv)

let encrypted = cipher.update(text, 'utf8', 'hex');
let final = cipher.final('hex');

let totalEncryption = encrypted + final;
console.log(`Ecrypted: ${totalEncryption}`);


const buf = Buffer.from(totalEncryption)
console.log(buf.toString('hex'))

const decipher = crypto.createDecipheriv(algorithm, password, iv);
let decrypt = decipher.update(totalEncryption, 'hex', 'utf8');
decrypt += decipher.final('utf8');

console.log(`Decrypted: ${decrypt}`)

