const db = require('../dao/db')

;(async () => {
  try {
    await db.schema.dropTableIfExists('users')
    await db.schema.withSchema('public').createTable('users', (table) => {
      table.increments()
      table.string('user_id')
      table.string('name')
      table.string('last_name')
      table.string('password')
    })
    console.log('Created users table!')
    process.exit(0)
  } catch (err) {
    console.log(err)
    process.exit(1)
  }
})()