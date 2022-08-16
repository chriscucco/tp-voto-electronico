const database = require('../dao/db');
const {processPassword} = require('../controllers/users/commons');

(async () => {
    try {
        console.log('Start running seeds!')


        //USERS SEEDS
        console.log('Starting users seeds...')
        await database('users').insert({user_id: 'ccucco', dni: '40128001', name: 'Christian', last_name: 'Cucco', password: processPassword('CCUCCO')})
        await database('users').insert({user_id: 'fcerquetti', dni: '1234', name: 'Franco', last_name: 'Cerquetti', password: processPassword('FCERQUETTI')})
        await database('users').insert({user_id: 'test1', dni: '1', name: 'Test1', last_name: 'Test', password: processPassword('TEST1')})
        await database('users').insert({user_id: 'test2', dni: '2', name: 'Test2', last_name: 'Test', password: processPassword('TEST2')})
        await database('users').insert({user_id: 'test3', dni: '3', name: 'Test3', last_name: 'Test', password: processPassword('TEST3')})
        console.log('Finished users seeds!')


        //ROLES SEEDS
        console.log('Starting roles seeds...')
        await database('roles').insert({user_id: 'ccucco', role: 'admin'})
        await database('roles').insert({user_id: 'fcerquetti', role: 'admin'})
        await database('roles').insert({user_id: 'test1', role: 'normal'})
        await database('roles').insert({user_id: 'test2', role: 'normal'})
        await database('roles').insert({user_id: 'test3', role: 'normal'})
        console.log('Finished roles seeds!')


        //VOTES SEEDS
        console.log('Starting votes seeds...')
        await database('votes').insert({user_id: 'ccucco', room_id: '1'})
        await database('votes').insert({user_id: 'ccucco', room_id: '2'})
        await database('votes').insert({user_id: 'ccucco', room_id: '5'})

        await database('votes').insert({user_id: 'fcerquetti', room_id: '1'})
        await database('votes').insert({user_id: 'fcerquetti', room_id: '3'})
        await database('votes').insert({user_id: 'fcerquetti', room_id: '5'})

        await database('votes').insert({user_id: 'test1', room_id: '1'})
        await database('votes').insert({user_id: 'test1', room_id: '4'})

        await database('votes').insert({user_id: 'test2', room_id: '5'})

        await database('votes').insert({user_id: 'test3', room_id: '1'})
        await database('votes').insert({user_id: 'test3', room_id: '3'})
        await database('votes').insert({user_id: 'test3', room_id: '4'})
        console.log('Finished votes seeds!')


        //ROOMS SEEDS
        console.log('Starting rooms seeds...')
        await database('rooms').insert({room_id: '1', end_time: '2022/01/01 00:00:00'})
        await database('rooms').insert({room_id: '2', end_time: '2023/01/01 00:00:00'})
        await database('rooms').insert({room_id: '3', end_time: '2023/01/01 00:00:00'})
        await database('rooms').insert({room_id: '4', end_time: '2023/01/01 00:00:00'})
        await database('rooms').insert({room_id: '5', end_time: '2023/01/01 00:00:00'})
        console.log('Finished rooms seeds!')


        //ROOMLISTS SEEDS
        console.log('Starting roomLists seeds...')
        await database('roomLists').insert({room_id: '1', list_id: '1'})
        await database('roomLists').insert({room_id: '1', list_id: '2'})
        await database('roomLists').insert({room_id: '1', list_id: '3'})
        await database('roomLists').insert({room_id: '1', list_id: '4'})

        await database('roomLists').insert({room_id: '2', list_id: '1'})
        await database('roomLists').insert({room_id: '2', list_id: '2'})
        await database('roomLists').insert({room_id: '2', list_id: '3'})
        await database('roomLists').insert({room_id: '2', list_id: '4'})

        await database('roomLists').insert({room_id: '3', list_id: '1'})
        await database('roomLists').insert({room_id: '3', list_id: '3'})

        await database('roomLists').insert({room_id: '4', list_id: '2'})
        await database('roomLists').insert({room_id: '4', list_id: '3'})
        await database('roomLists').insert({room_id: '4', list_id: '4'})

        await database('roomLists').insert({room_id: '5', list_id: '3'})
        await database('roomLists').insert({room_id: '5', list_id: '4'})
        console.log('Finished roomLists seeds!')


        //LISTS SEEDS
        console.log('Starting lists seeds...')
        await database('lists').insert({list_id: '1', name: 'Partido 1'})
        await database('lists').insert({list_id: '2', name: 'Partido 2'})
        await database('lists').insert({list_id: '3', name: 'Partido 3'})
        await database('lists').insert({list_id: '4', name: 'Partido 4'})
        console.log('Finished lists seeds!')


        //CANDIDATES SEEDS
        console.log('Starting candidates seeds...')
        await database('candidates').insert({list_id: '1', candidate_id: '1', name: 'Presidente 1', role: 'president'})
        await database('candidates').insert({list_id: '2', candidate_id: '2', name: 'Presidente 2', role: 'president'})
        await database('candidates').insert({list_id: '3', candidate_id: '3', name: 'Presidente 3', role: 'president'})
        await database('candidates').insert({list_id: '4', candidate_id: '4', name: 'Presidente 4', role: 'president'})
        await database('candidates').insert({list_id: '1', candidate_id: '5', name: 'Vicepresidente 1', role: 'vice-president'})
        await database('candidates').insert({list_id: '2', candidate_id: '6', name: 'Vicepresidente 2', role: 'vice-president'})
        await database('candidates').insert({list_id: '3', candidate_id: '7', name: 'Vicepresidente 3', role: 'vice-president'})
        await database('candidates').insert({list_id: '4', candidate_id: '8', name: 'Vicepresidente 4', role: 'vice-president'})
        await database('candidates').insert({list_id: '1', candidate_id: '9', name: 'Vocal 1', role: 'other'})
        await database('candidates').insert({list_id: '1', candidate_id: '10', name: 'Vocal 2', role: 'other'})
        await database('candidates').insert({list_id: '1', candidate_id: '11', name: 'Vocal 3', role: 'other'})
        await database('candidates').insert({list_id: '1', candidate_id: '12', name: 'Vocal 4', role: 'other'})
        await database('candidates').insert({list_id: '2', candidate_id: '13', name: 'Vocal 5', role: 'other'})
        await database('candidates').insert({list_id: '2', candidate_id: '14', name: 'Vocal 6', role: 'other'})
        await database('candidates').insert({list_id: '2', candidate_id: '15', name: 'Vocal 7', role: 'other'})
        await database('candidates').insert({list_id: '2', candidate_id: '16', name: 'Vocal 8', role: 'other'})
        await database('candidates').insert({list_id: '3', candidate_id: '17', name: 'Vocal 9', role: 'other'})
        await database('candidates').insert({list_id: '3', candidate_id: '18', name: 'Vocal 10', role: 'other'})
        await database('candidates').insert({list_id: '3', candidate_id: '19', name: 'Vocal 11', role: 'other'})
        await database('candidates').insert({list_id: '3', candidate_id: '20', name: 'Vocal 12', role: 'other'})
        await database('candidates').insert({list_id: '4', candidate_id: '21', name: 'Vocal 13', role: 'other'})
        await database('candidates').insert({list_id: '4', candidate_id: '22', name: 'Vocal 14', role: 'other'})
        await database('candidates').insert({list_id: '4', candidate_id: '23', name: 'Vocal 15', role: 'other'})
        await database('candidates').insert({list_id: '4', candidate_id: '24', name: 'Vocal 16', role: 'other'})
        console.log('Finished candidates seeds!')


        //VOTERS SEEDS
        console.log('Starting voters seeds...')
        await database('voters').insert({room_id: '1', user_id: 'ccucco'})
        await database('voters').insert({room_id: '1', user_id: 'fcerquetti'})
        await database('voters').insert({room_id: '1', user_id: 'test1'})
        await database('voters').insert({room_id: '1', user_id: 'test2'})
        await database('voters').insert({room_id: '1', user_id: 'test3'})

        await database('voters').insert({room_id: '2', user_id: 'ccucco'})
        await database('voters').insert({room_id: '2', user_id: 'fcerquetti'})
        await database('voters').insert({room_id: '2', user_id: 'test2'})
        await database('voters').insert({room_id: '2', user_id: 'test3'})

        await database('voters').insert({room_id: '3', user_id: 'fcerquetti'})
        await database('voters').insert({room_id: '3', user_id: 'test3'})

        await database('voters').insert({room_id: '4', user_id: 'ccucco'})
        await database('voters').insert({room_id: '4', user_id: 'test1'})
        await database('voters').insert({room_id: '4', user_id: 'test3'})

        await database('voters').insert({room_id: '5', user_id: 'ccucco'})
        await database('voters').insert({room_id: '5', user_id: 'fcerquetti'})
        await database('voters').insert({room_id: '5', user_id: 'test1'})
        await database('voters').insert({room_id: '5', user_id: 'test2'})
        console.log('Finished voters seeds!')


        console.log('Finished running all seeds successfully!')
        process.exit(0)
    } catch (err) {
        console.log(err)
        process.exit(1)
    }
})()