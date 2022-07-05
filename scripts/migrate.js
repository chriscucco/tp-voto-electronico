const db = require('../dao/db');

(async () => {
  try {
    await db.schema.dropTableIfExists('users')
    await db.schema.dropTableIfExists('roles')
    await db.schema.dropTableIfExists('votes')

    await db.schema.withSchema('public').createTable('users', (table) => {
      table.string('user_id')
      table.string('name')
      table.string('last_name')
      table.string('password')
    })
    console.log('Created users table!')

    await db.schema.withSchema('public').createTable('roles', (table) => {
        table.string('user_id')
        table.string('role')
    })
    console.log('Created roles table!')

    await db.schema.withSchema('public').createTable('votes', (table) => {
        table.string('user_id')
        table.string('room')
    })
    console.log('Created votes table!')

    process.exit(0)
  } catch (err) {
    console.log(err)
    process.exit(1)
  }
})()