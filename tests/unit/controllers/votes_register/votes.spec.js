const {getRegisteredVotes, getUserIDsByVotesRegistered, getVotesRegisteredByUserID, registerUserIDAndRoom} = require('../../../../controllers/votes_register/votes')
var mockDb = require('mock-knex');

var db = require('../../../../dao/db')
var tracker = require('mock-knex').getTracker();


describe('Testing votes functions', () => {
    beforeAll(() => {
      mockDb.mock(db);
      tracker.install();
    });

    afterAll(() => {
      mockDb.unmock(db);
    });


    test('testGetRegisteredVotes', async () => {
      const req = {};
      const res = {};
      tracker.on('query', function sendResult(query) {
        query.response([
          {user_id: '1234', room: 'room1'},
          {user_id: '5678', room: 'room2'},
        ]);
      });

      const response = await getRegisteredVotes(req, res)
      expect(response.length).toEqual(2);
    });

    test('testGetVotesRegisteredByUserID', async () => {
        const req = {
            query: {
                user_id: '1234'
            }
        };
        const res = {};
        tracker.on('query', function sendResult(query) {
          query.response([
            {user_id: '1234', room: 'room1'},
          ]);
        });
  
        const response = await getVotesRegisteredByUserID(req, res)
        expect(response.length).toEqual(1);
    });

    test('testGetVotesRegisteredByUserIDNotSentButSuccess', async () => {
        const req = {
            query: {}
        };
        const res = {};
        tracker.on('query', function sendResult(query) {
          query.response([]);
        });
  
        const response = await getVotesRegisteredByUserID(req, res)
        expect(response.length).toEqual(0);
    });

    test('testGetUserIDsByVotesRegistered', async () => {
        const req = {
            query: {
                room: 'room1'
            }
        };
        const res = {};
        tracker.on('query', function sendResult(query) {
          query.response([
            {user_id: '1234', room: 'room1'},
          ]);
        });
  
        const response = await getUserIDsByVotesRegistered(req, res)
        expect(response.length).toEqual(1);
    });

    test('testGetUserIDsByVotesRegisteredNotSentButSuccess', async () => {
        const req = {
            query: {}
        };
        const res = {};
        tracker.on('query', function sendResult(query) {
          query.response([]);
        });
  
        const response = await getUserIDsByVotesRegistered(req, res)
        expect(response.length).toEqual(0);
    });

    test('testRegisterUserIDAndRoom', async () => {
        const req = {
            body: {
                'user_id': '1234',
                'room': 'room1',
            }
        };
        const res = {};
        tracker.on('query', function sendResult(query) {
          query.response([]);
        });
  
        const response = await registerUserIDAndRoom(req, res)
        expect(response.valid).toEqual(true);
    });

    test('testRegisterUserIDAndRoomInvalidUserID', async () => {
        const req = {
            body: {
                'room': 'room1',
            }
        };
        const res = {};
        tracker.on('query', function sendResult(query) {
          query.response([]);
        });
  
        const response = await registerUserIDAndRoom(req, res)
        expect(response.valid).toEqual(false);
    });

    test('testRegisterUserIDAndRoomInvalidRoom', async () => {
        const req = {
            body: {
                'user_id': '1234',
            }
        };
        const res = {};
        tracker.on('query', function sendResult(query) {
          query.response([]);
        });
  
        const response = await registerUserIDAndRoom(req, res)
        expect(response.valid).toEqual(false);
    });
});