const {getAllVotersAndRooms, getVotersByRoom,  getRoomsByVoter,  createNewVoter, addNewVotersGroup} = require('../../../../controllers/voters/voters')
var mockDb = require('mock-knex');

var db = require('../../../../dao/db')
var tracker = require('mock-knex').getTracker();


describe('Testing voters functions', () => {
    beforeAll(() => {
      mockDb.mock(db);
      tracker.install();
    });

    afterAll(() => {
      mockDb.unmock(db);
    });

    test('testGetAllVotersAndRooms', async () => {
        const req = {};
        const res = {};
        tracker.on('query', function sendResult(query) {
          query.response([
            {user_id: '1234', room_id:'1'},
            {user_id: '5678', room_id:'2'},
          ]);
        });
  
        const response = await getAllVotersAndRooms(req, res)
        expect(response.length).toEqual(2);
    });

    test('testGetVotersByRoom', async () => {
        const req = {
            query: {
                room_id: '1'
            }
        };
        const res = {};
        tracker.on('query', function sendResult(query) {
          query.response([
            {user_id: '1234', room_id:'1'}
          ]);
        });
  
        const response = await getVotersByRoom(req, res)
        expect(response.length).toEqual(1);
    });

    test('testGetRoomsByVoters', async () => {
        const req = {
            query: {
                user_id: '1234'
            }
        };
        const res = {};
        tracker.on('query', function sendResult(query) {
          query.response([
            {user_id: '1234', room_id:'1'}
          ]);
        });
  
        const response = await getRoomsByVoter(req, res)
        expect(response.length).toEqual(1);
    });

    test('testCreateNewVoter', async () => {
        tracker.on('query', function sendResult(query) {
            query.response([]);
          });
          const req = {
            body: {
              user_id: '123',
              room_id: '1',
            },
          };
          const res = {};
    
          const response = await createNewVoter(req, res);
          expect(response.valid).toEqual(true);
    });

    test('testCreateNewVoterFailsNoUser', async () => {
        tracker.on('query', function sendResult(query) {
            query.response([]);
          });
          const req = {
            body: {
              room_id: '1',
            },
          };
          const res = {};
    
          const response = await createNewVoter(req, res);
          expect(response.valid).toEqual(false);
    });

    test('testCreateNewVoterFailsNoRoom', async () => {
        tracker.on('query', function sendResult(query) {
            query.response([]);
          });
          const req = {
            body: {
              user_id: '123',
            },
          };
          const res = {};
    
          const response = await createNewVoter(req, res);
          expect(response.valid).toEqual(false);
    });

    test('testCreateNewVoterDuplicatedRegister', async () => {
        tracker.on('query', function sendResult(query) {
            query.response([
                {user_id: '1234', room_id:'1'}
            ]);
          });
          const req = {
            body: {
              user_id: '123',
              room_id: '1',
            },
          };
          const res = {};
    
          const response = await createNewVoter(req, res);
          expect(response.valid).toEqual(false);
    });

    test('testaddNewVotersGroupUserNotFound', async () => {
      tracker.on('query', function sendResult(query) {
          query.response([]);
        });
        const req = {
          body: {
            voterIds: '123,456',
            roomId: '1',
          },
        };
        const res = {};
  
        const response = await addNewVotersGroup(req, res);
        expect(response.valid).toEqual(false);
  });

  test('testaddNewVotersGroupUserDuplicated', async () => {
    tracker.on('query', function sendResult(query) {
        query.response([
          {user_id: '1234', room_id:'1'}
        ]);
      });
      const req = {
        body: {
          voterIds: '123,456',
          roomId: '1',
        },
      };
      const res = {};

      const response = await addNewVotersGroup(req, res);
      expect(response.valid).toEqual(false);
  });

  test('testaddNewVotersGroupInvalidParams', async () => {
    tracker.on('query', function sendResult(query) {
        query.response([]);
      });
      const req = {
        body: {
          roomId: '1',
        },
      };
      const res = {};

      const response = await addNewVotersGroup(req, res);
      expect(response.valid).toEqual(false);
  });
});