const {createUser, getUsers, getUserByUserId} = require('../../../../controllers/users/users')
var mockDb = require('mock-knex');
var db = require('../../../../dao/db')
var tracker = require('mock-knex').getTracker();


describe('Testing user functions', () => {
    beforeAll(() => {
      mockDb.mock(db);
      tracker.install();
    });

    afterAll(() => {
      mockDb.unmock(db);
    });

    test('testCreate', async () => {
      tracker.on('query', function sendResult(query) {
        query.response([]);
      });
      const req = {
        body: {
          userId: '123',
          dni: '123',
          userFirstName: 'testName',
          userLastName: 'testLasName',
          password: 'abc123'
        },
      };
      const res = {};

      const response = await createUser(req, res);
      expect(response.valid).toEqual(true);
    });

    test('testCreateFailsAlreadyExists', async () => {
      tracker.on('query', function sendResult(query) {
        query.response([
          {user_id: '123', dni: '123', name:'testName', last_name: 'testLasName', password: 'abc123'},
        ]);
      });
      const req = {
        body: {
          userId: '123',
          dni: '123',
          userFirstName: 'testName',
          userLastName: 'testLasName',
          password: 'abc123'
        },
      };
      const res = {};

      const response = await createUser(req, res);
      expect(response.valid).toEqual(false);
      expect(response.message).toEqual('User already exists in database');
    });

   test('testCreateFailsInvalidUserID', async () => {
      const req = {
        body: {
          userFirstName: 'testName',
          userLastName: 'testLasName',
          password: 'abc123'
        },
      };
      const res = {};

      const response = await createUser(req, res)
      expect(response.valid).toEqual(false);
      expect(response.message).toEqual('Error processing params');
    });

    test('testCreateFailsInvalidName', async () => {
      const req = {
        body: {
          userId: '123',
          userLastName: 'testLasName',
          password: 'abc123'
        },
      };
      const res = {};

      const response = await createUser(req, res)
      expect(response.valid).toEqual(false);
      expect(response.message).toEqual('Error processing params');
    });

    test('testCreateFailsInvalidLastName', async () => {
      const req = {
        body: {
          userId: '123',
          userFirstName: 'testName',
          password: 'abc123'
        },
      };
      const res = {};

      const response = await createUser(req, res)
      expect(response.valid).toEqual(false);
      expect(response.message).toEqual('Error processing params');
    });

    test('testCreateFailsInvalidPassword', async () => {
      const req = {
        body: {
          userId: '123',
          userFirstName: 'testName',
          userLastName: 'testLasName',
        },
      };
      const res = {};

      const response = await createUser(req, res)
      expect(response.valid).toEqual(false);
      expect(response.message).toEqual('Error processing params');
    });

    test('testGetUsers', async () => {
      const req = {};
      const res = {};
      tracker.on('query', function sendResult(query) {
        query.response([
          {user_id: '1234', name:'test', last_name: 'test', password: 'test'},
          {user_id: '5678', name:'test2', last_name: 'test2', password: 'test2'},
        ]);
      });

      const response = await getUsers(req, res)
      expect(response.length).toEqual(2);
    });

    test('testGetUsersByUserID', async () => {
      const req = {
        query: {
          user_id: '1234'
        }
      };
      const res = {};
      tracker.on('query', function sendResult(query) {
        query.response([
          {user_id: '1234', name:'test', last_name: 'test', password: 'test'},
        ]);
      });

      const response = await getUserByUserId(req, res)
      expect(response.length).toEqual(1);
    });
});