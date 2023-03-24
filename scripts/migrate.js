const db = require('../dao/db');

(async () => {
  try {
    await db.schema.dropTableIfExists('users')
    await db.schema.dropTableIfExists('roles')
    await db.schema.dropTableIfExists('votes')
    await db.schema.dropTableIfExists('rooms')
    await db.schema.dropTableIfExists('roomLists')
    await db.schema.dropTableIfExists('lists')
    await db.schema.dropTableIfExists('candidates')
    await db.schema.dropTableIfExists('voters')
    await db.schema.dropTableIfExists('reviewers')

    await db.schema.withSchema('public').createTable('users', (table) => {
      table.string('user_id')
      table.string('dni')
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
        table.string('room_id')
    })
    console.log('Created votes table!')

    await db.schema.withSchema('public').createTable('lists', (table) => {
      table.string('list_id')
      table.string('name')
    })
    console.log('Created lists table!')

    await db.schema.withSchema('public').createTable('candidates', (table) => {
      table.string('list_id')
      table.string('candidate_id')
      table.string('name')
      table.string('role')
    })
    console.log('Created candidates table!')

    await db.schema.withSchema('public').createTable('voters', (table) => {
      table.string('room_id')
      table.string('user_id')
    })
    console.log('Created voters table!')

    await db.schema.withSchema('public').createTable('rooms', (table) => {
      table.string('room_id')
      table.string('init_date')
      table.string('end_date')
      table.string('description')
    })
    console.log('Created rooms table!')

    await db.schema.withSchema('public').createTable('roomLists', (table) => {
      table.string('room_id')
      table.string('list_id')
    })
    console.log('Created roomLists table!')

    await db.schema.withSchema('public').createTable('reviewers', (table) => {
      table.string('user_id')
      table.string('list_id')
    })
    console.log('Created reviewers table!')


    process.exit(0)
  } catch (err) {
    console.log(err)
    process.exit(1)
  }
})()