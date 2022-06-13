
var environment = process.env.NODE_ENV || 'development';
var config = require('../knexfile')[environment];
const knex = require('knex')
console.log("////////////")
console.log(config)
console.log("////////////")
console.log(process.env.NODE_ENV)
console.log("////////////")
console.log(process.env.DATABASE_URL)
console.log("////////////")
module.exports = knex(config);