const {logInUser} = require('../../../../controllers/users/login')
const {processPassword} = require('../../../../controllers/users/commons')
var mockDb = require('mock-knex');
var db = require('../../../../dao/db')
var tracker = require('mock-knex').getTracker();

describe('Testing login functions', () => {
    beforeAll(() => {
      mockDb.mock(db);
      tracker.install();
    });
  
    afterAll(() => {
      mockDb.unmock(db);
    });

    test('testLlogInUser', async () => {
        tracker.on('query', function sendResult(query) {
            query.response([
                {user_id: '123', password: processPassword('abc123')}
            ]);
        });

        const req = {
            body: {
                user_id: '123',
                password: 'abc123'
            },
        }
        const res = {}
        const response = await logInUser(req, res);
        expect(response.valid).toEqual(true);
    });

    test('testLlogInUserInvalidPassword', async () => {
        tracker.on('query', function sendResult(query) {
            query.response([
                {user_id: '123', password: processPassword('abc12')}
            ]);
        });

        const req = {
            body: {
                user_id: '123',
                password: 'abc123'
            },
        }
        const res = {}
        const response = await logInUser(req, res);
        expect(response.valid).toEqual(false);
    });

    test('testLlogInUserNotFound', async () => {
        tracker.on('query', function sendResult(query) {
            query.response([]);
        });

        const req = {
            body: {
                user_id: '123',
                password: 'abc123'
            },
        }
        const res = {}
        const response = await logInUser(req, res);
        expect(response.valid).toEqual(false);
    });

    test('testLlogInUserUserAndPasswordNotSent', async () => {
        tracker.on('query', function sendResult(query) {
            query.response([]);
        });

        const req = {
            body: {},
        }
        const res = {}
        const response = await logInUser(req, res);
        expect(response.valid).toEqual(false);
    });
});