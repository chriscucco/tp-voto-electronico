const {getAllRoomLists, getRoomByListId, getListByRoomId, createNewRoomList, addListsToRoom} = require('../../../../controllers/roomLists/roomLists')
var mockDb = require('mock-knex');

var db = require('../../../../dao/db')
var tracker = require('mock-knex').getTracker();


describe('Testing roomLists functions', () => {
    beforeAll(() => {
      mockDb.mock(db);
      tracker.install();
    });

    afterAll(() => {
      mockDb.unmock(db);
    });

    test('testGetAllRoomLists', async () => {
        const req = {};
        const res = {};
        tracker.on('query', function sendResult(query) {
          query.response([
            {room_id: '1', list_id:'1'},
            {room_id: '2', list_id:'1'},
          ]);
        });
  
        const response = await getAllRoomLists(req, res)
        expect(response.length).toEqual(2);
    });

    test('testGetRoomByListId', async () => {
        const req = {
            params: {
                id: '1'
            }
        };
        const res = {};
        tracker.on('query', function sendResult(query) {
          query.response([
            {room_id: '2', list_id:'1'}
          ]);
        });
  
        const response = await getRoomByListId(req, res)
        expect(response.length).toEqual(1);
    });

    test('testGetListByRoomId', async () => {
        const req = {
            params: {
                id: '1'
            }
        };
        const res = {};
        tracker.on('query', function sendResult(query) {
          query.response([
            {room_id: '2', list_id:'1'}
          ]);
        });
  
        const response = await getListByRoomId(req, res)
        expect(response.length).toEqual(1);
    });

    test('testCreateNewRoomList', async () => {
        tracker.on('query', function sendResult(query) {
            query.response([
                {room_id: '1', list_id:'1'}
            ]);
          });
          const req = {
            body: {
              list_id: '1',
              room_id: '1',
            },
          };
          const res = {};
    
          const response = await createNewRoomList(req, res);
          expect(response.valid).toEqual(false);
    })

    test('testCreateNewRoomListInvalidRoomID', async () => {
        tracker.on('query', function sendResult(query) {
            query.response([
                {room_id: '1', list_id:'1'}
            ]);
          });
          const req = {
            body: {
              list_id: '1',
            },
          };
          const res = {};
    
          const response = await createNewRoomList(req, res);
          expect(response.valid).toEqual(false);
    })

    test('testCreateNewRoomListInvalidListID', async () => {
        tracker.on('query', function sendResult(query) {
            query.response([
                {room_id: '1', list_id:'1'}
            ]);
          });
          const req = {
            body: {
              room_id: '1',
            },
          };
          const res = {};
    
          const response = await createNewRoomList(req, res);
          expect(response.valid).toEqual(false);
    })

    test('testCreateNewRoomListNotFound', async () => {
        tracker.on('query', function sendResult(query) {
            query.response([]);
          });
          const req = {
            body: {
              list_id: '1',
              room_id: '1',
            },
          };
          const res = {};
    
          const response = await createNewRoomList(req, res);
          expect(response.valid).toEqual(false);
    })

    test('testAddListsToRoom', async () => {
        tracker.on('query', function sendResult(query) {
            query.response([
                {room_id: '1', list_id:'1'}
            ]);
          });
          const req = {
            body: {
              listsId: '1,2,3',
              roomId: '1',
            },
          };
          const res = {};
    
          const response = await addListsToRoom(req, res);
          expect(response.valid).toEqual(false);
    })

    test('testAddListsToRoomInvalidRoomID', async () => {
        tracker.on('query', function sendResult(query) {
            query.response([
                {room_id: '1', list_id:'1'}
            ]);
          });
          const req = {
            body: {
              listsId: '1,2,3',
            },
          };
          const res = {};
    
          const response = await addListsToRoom(req, res);
          expect(response.valid).toEqual(false);
    })

    test('testAddListsToRoomInvalidListID', async () => {
        tracker.on('query', function sendResult(query) {
            query.response([
                {room_id: '1', list_id:'1'}
            ]);
          });
          const req = {
            body: {
              roomId: '1',
            },
          };
          const res = {};
    
          const response = await addListsToRoom(req, res);
          expect(response.valid).toEqual(false);
    })

    test('testAddListsToRoomFailsNotFound', async () => {
        tracker.on('query', function sendResult(query) {
            query.response([]);
          });
          const req = {
            body: {
              listsId: '1,2,3',
              roomId: '1',
            },
          };
          const res = {};
    
          const response = await addListsToRoom(req, res);
          expect(response.valid).toEqual(false);
    })
});