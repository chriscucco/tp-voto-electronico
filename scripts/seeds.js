const database = require('../dao/db');
const {processPassword} = require('../controllers/users/commons');

(async () => {
    try {
        console.log('Start running seeds!')


        //USERS SEEDS
        console.log('Starting users seeds...')
        await database('users').insert({user_id: 'ccucco', dni: '40128001', name: 'Christian', last_name: 'Cucco', password: processPassword('CCUCCO')})
        await database('users').insert({user_id: 'fcerquetti', dni: '1234', name: 'Franco', last_name: 'Cerquetti', password: processPassword('FCERQUETTI')})
        await database('users').insert({user_id: 'test1', dni: '1', name: 'UsuarioNominal1', last_name: 'Test', password: processPassword('TEST1')})
        await database('users').insert({user_id: 'test2', dni: '2', name: 'UsuarioNominal2', last_name: 'Test', password: processPassword('TEST2')})
        await database('users').insert({user_id: 'test3', dni: '3', name: 'UsuarioNominal3', last_name: 'Test', password: processPassword('TEST3')})
        await database('users').insert({user_id: 'fiscal1', dni: '4', name: 'Fiscal1', last_name: 'Test', password: processPassword('FISCAL1')})
        await database('users').insert({user_id: 'fiscal2', dni: '5', name: 'Fiscal2', last_name: 'Test', password: processPassword('FISCAL2')})
        await database('users').insert({user_id: 'fiscal3', dni: '6', name: 'Fiscal3', last_name: 'Test', password: processPassword('FISCAL3')})
        await database('users').insert({user_id: 'fiscal4', dni: '7', name: 'Fiscal4', last_name: 'Test', password: processPassword('FISCAL4')})
        await database('users').insert({user_id: 'fiscal5', dni: '8', name: 'Fiscal5', last_name: 'Test', password: processPassword('FISCAL5')})
        await database('users').insert({user_id: 'jperez', dni: '18435283', name: 'Juan', last_name: 'Perez', password: processPassword('JPEREZ')})
        await database('users').insert({user_id: 'pgonzalez', dni: '20482734', name: 'Pablo', last_name: 'Gonzalez', password: processPassword('PGONZALEZ')})
        await database('users').insert({user_id: 'cgomez', dni: '32134929', name: 'Carlos', last_name: 'Gomez', password: processPassword('CGONZALEZ')})
        await database('users').insert({user_id: 'pmartinez', dni: '38129738', name: 'Pedro', last_name: 'Martinez', password: processPassword('PMARTINEZ')})
        await database('users').insert({user_id: 'sconde', dni: '19738276', name: 'Silvia', last_name: 'Conde', password: processPassword('SCONDE')})
        await database('users').insert({user_id: 'vvega', dni: '41918234', name: 'Victoria', last_name: 'Vega', password: processPassword('VVEGA')})
        await database('users').insert({user_id: 'ssilveyra', dni: '39282716', name: 'Juana', last_name: 'Silveyra', password: processPassword('SSILVEYRA')})
        await database('users').insert({user_id: 'scervantes', dni: '34192718', name: 'Marcela', last_name: 'Cervantes', password: processPassword('SCERVANTES')})
        await database('users').insert({user_id: 'salbertario', dni: '28757192', name: 'Susana', last_name: 'Albertario', password: processPassword('SALBERTARIO')})
        await database('users').insert({user_id: 'dsilva', dni: '32985712', name: 'Diego', last_name: 'Silva', password: processPassword('DSILVA')})
        await database('users').insert({user_id: 'malonso', dni: '32857291', name: 'Miguel', last_name: 'Alonso', password: processPassword('MALONSO')})
        await database('users').insert({user_id: 'mmorales', dni: '17291234', name: 'Matias', last_name: 'Morales', password: processPassword('MMORALES')})        
        console.log('Finished users seeds!')


        //ROLES SEEDS
        console.log('Starting roles seeds...')
        await database('roles').insert({user_id: 'ccucco', role: 'admin'})
        await database('roles').insert({user_id: 'fcerquetti', role: 'admin'})
        await database('roles').insert({user_id: 'fiscal1', role: 'reviewer'})
        await database('roles').insert({user_id: 'fiscal2', role: 'reviewer'})
        await database('roles').insert({user_id: 'fiscal3', role: 'reviewer'})
        await database('roles').insert({user_id: 'fiscal4', role: 'reviewer'})
        await database('roles').insert({user_id: 'fiscal5', role: 'reviewer'})
        await database('roles').insert({user_id: 'test1', role: 'normal'})
        await database('roles').insert({user_id: 'test2', role: 'normal'})
        await database('roles').insert({user_id: 'test3', role: 'normal'})
        await database('roles').insert({user_id: 'jperez', role: 'normal'})
        await database('roles').insert({user_id: 'pgonzalez', role: 'normal'})
        await database('roles').insert({user_id: 'cgomez', role: 'normal'})
        await database('roles').insert({user_id: 'pmartinez', role: 'normal'})
        await database('roles').insert({user_id: 'sconde', role: 'normal'})
        await database('roles').insert({user_id: 'vvega', role: 'normal'})
        await database('roles').insert({user_id: 'ssilveyra', role: 'normal'})
        await database('roles').insert({user_id: 'scervantes', role: 'normal'})
        await database('roles').insert({user_id: 'salbertario', role: 'normal'})
        await database('roles').insert({user_id: 'dsilva', role: 'normal'})
        await database('roles').insert({user_id: 'malonso', role: 'normal'})
        await database('roles').insert({user_id: 'mmorales', role: 'normal'})

        console.log('Finished roles seeds!')


       /*  //VOTES SEEDS
        console.log('Starting votes seeds...')
        await database('votes').insert({user_id: 'ccucco', room_id: '1'})
        await database('votes').insert({user_id: 'ccucco', room_id: '2'})

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
 */
        //LISTS SEEDS
        console.log('Starting lists seeds...')
        await database('lists').insert({list_id: '1', name: 'Partido 1'})
        await database('lists').insert({list_id: '2', name: 'Partido 2'})
        await database('lists').insert({list_id: '3', name: 'Partido 3'})
        console.log('Finished lists seeds!')


        //CANDIDATES SEEDS
        console.log('Starting candidates seeds...')
        await database('candidates').insert({list_id: '1', candidate_id: '1', name: 'Juan Castro', role: 'Presidente'})
        await database('candidates').insert({list_id: '2', candidate_id: '2', name: 'Enrique Gomez', role: 'Presidente'})
        await database('candidates').insert({list_id: '3', candidate_id: '3', name: 'Julieta Perez', role: 'Presidente'})
        await database('candidates').insert({list_id: '1', candidate_id: '5', name: 'Santiago Centurion', role: 'VicePresidente'})
        await database('candidates').insert({list_id: '2', candidate_id: '6', name: 'Claudia Ruso', role: 'VicePresidente'})
        await database('candidates').insert({list_id: '3', candidate_id: '7', name: 'Vicente Vega', role: 'VicePresidente'})
        await database('candidates').insert({list_id: '1', candidate_id: '9', name: 'Alan Becerra', role: 'Otro'})
        await database('candidates').insert({list_id: '1', candidate_id: '10', name: 'Javier Palermo', role: 'Otro'})
        await database('candidates').insert({list_id: '1', candidate_id: '11', name: 'Paula Pascal', role: 'Otro'})
        await database('candidates').insert({list_id: '1', candidate_id: '12', name: 'Julian Montes', role: 'Otro'})
        await database('candidates').insert({list_id: '2', candidate_id: '13', name: 'Augusto Ramos', role: 'Otro'})
        await database('candidates').insert({list_id: '2', candidate_id: '14', name: 'Victoria Mercado', role: 'Otro'})
        await database('candidates').insert({list_id: '2', candidate_id: '15', name: 'Soledad Iglesias', role: 'Otro'})
        await database('candidates').insert({list_id: '2', candidate_id: '16', name: 'Tomas Gimenez', role: 'Otro'})
        await database('candidates').insert({list_id: '3', candidate_id: '17', name: 'Silvia Casco', role: 'Otro'})
        await database('candidates').insert({list_id: '3', candidate_id: '18', name: 'Adrian Rodriguez', role: 'Otro'})
        await database('candidates').insert({list_id: '3', candidate_id: '19', name: 'Armando Silva', role: 'Otro'})
        await database('candidates').insert({list_id: '3', candidate_id: '20', name: 'Roman Cárdenas', role: 'Otro'})
        console.log('Finished candidates seeds!')


        //VOTERS SEEDS
       /* console.log('Starting voters seeds...')
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

        await database('voters').insert({room_id: '9', user_id: 'ccucco'})
        await database('voters').insert({room_id: '9', user_id: 'fcerquetti'})
        await database('voters').insert({room_id: '9', user_id: 'test1'})
        await database('voters').insert({room_id: '9', user_id: 'test2'})
        await database('voters').insert({room_id: '9', user_id: 'test3'})

        await database('voters').insert({room_id: '10', user_id: 'ccucco'})
        await database('voters').insert({room_id: '10', user_id: 'fcerquetti'})
        await database('voters').insert({room_id: '10', user_id: 'test1'})
        await database('voters').insert({room_id: '10', user_id: 'test2'})
        await database('voters').insert({room_id: '10', user_id: 'test3'})

        await database('voters').insert({room_id: '11', user_id: 'ccucco'})
        await database('voters').insert({room_id: '11', user_id: 'fcerquetti'})
        await database('voters').insert({room_id: '11', user_id: 'test1'})
        await database('voters').insert({room_id: '11', user_id: 'test2'})
        await database('voters').insert({room_id: '11', user_id: 'test3'})

        await database('voters').insert({room_id: '14', user_id: 'ccucco'})
        console.log('Finished voters seeds!')

        //ROOMS SEEDS
        await database('rooms').insert({room_id: '1', init_date: '2022-09-17T19:18', end_date:'2022-12-17T19:18', description: 'Elección 1', ready_for_review: 'false', ready: 'false'})
        await database('rooms').insert({room_id: '2', init_date: '2022-09-17T19:18', end_date:'2022-10-17T19:18', description: 'Elección 2', ready_for_review: 'true', ready: 'false'})
        await database('rooms').insert({room_id: '3', init_date: '2022-09-17T19:18', end_date:'2022-12-17T19:18', description: 'Elección 3', ready_for_review: 'true', ready: 'true'})
        await database('rooms').insert({room_id: '4', init_date: '2022-09-17T19:18', end_date:'2022-12-17T19:18', description: 'Elección 4', ready_for_review: 'true', ready: 'true'})
        await database('rooms').insert({room_id: '5', init_date: '2022-09-17T19:18', end_date:'2022-12-17T19:18', description: 'Elección 5', ready_for_review: 'true', ready: 'true'})
        await database('rooms').insert({room_id: '9', init_date: '2022-09-17T19:18', end_date:'2022-11-10T19:18', description: 'Elección 9', ready_for_review: 'true', ready: 'true'})
        await database('rooms').insert({room_id: '10', init_date: '2022-09-17T19:18', end_date:'2022-11-10T19:18', description: 'Elección 10', ready_for_review: 'true', ready: 'true'})
        await database('rooms').insert({room_id: '11', init_date: '2022-09-17T19:18', end_date:'2022-11-08T19:18', description: 'Elección 11', ready_for_review: 'true', ready: 'true'})
        await database('rooms').insert({room_id: '14', init_date: '2022-09-17T19:18', end_date:'2022-12-08T19:18', description: 'Elección 14', ready_for_review: 'true', ready: 'true'})
        console.log('Finished rooms seeds!')

        //ROOMLISTS SEEDS
        await database('roomLists').insert({room_id: '1', list_id: '1'})
        await database('roomLists').insert({room_id: '2', list_id: '1'})
        await database('roomLists').insert({room_id: '3', list_id: '1'})
        await database('roomLists').insert({room_id: '4', list_id: '1'})
        await database('roomLists').insert({room_id: '5', list_id: '1'})
        await database('roomLists').insert({room_id: '1', list_id: '2'})
        await database('roomLists').insert({room_id: '2', list_id: '2'})
        await database('roomLists').insert({room_id: '3', list_id: '2'})
        await database('roomLists').insert({room_id: '4', list_id: '2'})
        await database('roomLists').insert({room_id: '1', list_id: '3'})
        //await database('roomLists').insert({room_id: '2', list_id: '3'})
        await database('roomLists').insert({room_id: '3', list_id: '3'})
        await database('roomLists').insert({room_id: '4', list_id: '3'})
        await database('roomLists').insert({room_id: '1', list_id: '4'})
        //await database('roomLists').insert({room_id: '2', list_id: '4'})
        await database('roomLists').insert({room_id: '3', list_id: '4'})
        await database('roomLists').insert({room_id: '4', list_id: '4'})

        await database('roomLists').insert({room_id: '9', list_id: '1'})
        await database('roomLists').insert({room_id: '9', list_id: '2'})
        await database('roomLists').insert({room_id: '9', list_id: '3'})
        await database('roomLists').insert({room_id: '9', list_id: '4'})
        await database('roomLists').insert({room_id: '10', list_id: '1'})
        await database('roomLists').insert({room_id: '10', list_id: '2'})
        await database('roomLists').insert({room_id: '10', list_id: '3'})
        await database('roomLists').insert({room_id: '10', list_id: '4'})
        await database('roomLists').insert({room_id: '11', list_id: '1'})
        await database('roomLists').insert({room_id: '11', list_id: '2'})
        await database('roomLists').insert({room_id: '11', list_id: '3'})
        await database('roomLists').insert({room_id: '11', list_id: '4'})
        console.log('Finished roomLists seeds!')*/


        //REVIEWERS SEEDS
        await database('reviewers').insert({user_id: 'fiscal1', list_id: '1'})
        await database('reviewers').insert({user_id: 'fiscal5', list_id: '1'})
        await database('reviewers').insert({user_id: 'fiscal2', list_id: '2'})
        await database('reviewers').insert({user_id: 'fiscal3', list_id: '3'})
        await database('reviewers').insert({user_id: 'fiscal4', list_id: '2'})
        console.log('Finished reviewers seeds!')

        console.log('Finished running all seeds successfully!')
        process.exit(0)
    } catch (err) {
        console.log(err)
        process.exit(1)
    }
})()