const knex = require('knex')

module.exports = knex({
  client: 'postgres',
  connection: {
    host: 'db',
    user: 'root',
    password: 'toor',
    database: 'votoElectronico',
  },
})