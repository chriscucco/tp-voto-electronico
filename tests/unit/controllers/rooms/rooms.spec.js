const {getRoomByID, getAllRooms, createRoom, showAllRooms} = require('../../../../controllers/rooms/rooms')
var mockDb = require('mock-knex');

var db = require('../../../../dao/db')
var tracker = require('mock-knex').getTracker();


describe('Testing rooms functions', () => {
    beforeAll(() => {
      mockDb.mock(db);
      tracker.install();
    });

    afterAll(() => {
      mockDb.unmock(db);
    });

    test('testGetAllRooms', async () => {
        const req = {};
        const res = {};
        tracker.on('query', function sendResult(query) {
          query.response([
            {room_id: '1', init_date: '2022-09-17T19:18', end_date:'2022-12-17T19:18'},
            {room_id: '2', init_date: '2022-09-17T19:18', end_date:'2022-12-17T19:18'},
          ]);
        });
  
        const response = await getAllRooms(req, res)
        expect(response.length).toEqual(2);
    })

    test('testGetRoomByID', async () => {
        const req = {
            params: {
                id: '1'
            }
        };
        const res = {};
        tracker.on('query', function sendResult(query) {
          query.response([
            {room_id: '1', init_date: '2022-09-17T19:18', end_date:'2022-12-17T19:18'},
          ]);
        });
  
        const response = await getRoomByID(req, res)
        expect(response.length).toEqual(1);
    })

    test('testCreateNewRoomListNoDates', async () => {
        tracker.on('query', function sendResult(query) {
            query.response([]);
          });
          const req = {
            body: {
                description:'test'
            },
          };
          const res = {};
    
          const response = await createRoom(req, res);
          expect(response.valid).toEqual(false);
    })

    test('testCreateNewRoomListNoDescription', async () => {
        tracker.on('query', function sendResult(query) {
            query.response([]);
          });
          const req = {
            body: {
              dates: ["1234", "5678"]
            },
          };
          const res = {};
    
          const response = await createRoom(req, res);
          expect(response.valid).toEqual(false);
    })

    test('testShowAllRooms', async () => {
      tracker.on('query', function sendResult(query) {
          query.response([{room_id: '1', init_date: '2022-09-17T19:18', end_date:'2022-12-17T19:18', description: 'Elección 1'}]);
        });
        const req = {};
        const res = {};
  
        const response = await showAllRooms(req, res);
        expect(response.length).toEqual(1);
  })
});