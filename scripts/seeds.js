const database = require('../dao/db');
const {processPassword} = require('../controllers/users/commons');

(async () => {
    try {
        console.log('Start running seeds!')
        console.log('Starting users seeds...')
        await database('users').insert({user_id: 'ccucco', dni: '40128001', name: 'Christian', last_name: 'Cucco', password: processPassword('CCUCCO')})
        await database('users').insert({user_id: 'fcerquetti', dni: '1234', name: 'Franco', last_name: 'Cerquetti', password: processPassword('FCERQUETTI')})
        await database('users').insert({user_id: 'test1', dni: '1', name: 'Test1', last_name: 'Test', password: processPassword('TEST1')})
        await database('users').insert({user_id: 'test2', dni: '2', name: 'Test2', last_name: 'Test', password: processPassword('TEST2')})
        await database('users').insert({user_id: 'test3', dni: '3', name: 'Test3', last_name: 'Test', password: processPassword('TEST3')})
        console.log('Finished users seeds!')

        console.log('Starting roles seeds...')
        await database('roles').insert({user_id: 'ccucco', role: 'admin'})
        await database('roles').insert({user_id: 'fcerquetti', role: 'admin'})
        await database('roles').insert({user_id: 'test1', role: 'normal'})
        await database('roles').insert({user_id: 'test2', role: 'normal'})
        await database('roles').insert({user_id: 'test3', role: 'normal'})
        console.log('Finished roles seeds!')

        console.log('Finished running all seeds successfully!')
        process.exit(0)
    } catch (err) {
        console.log(err)
        process.exit(1)
    }
})()