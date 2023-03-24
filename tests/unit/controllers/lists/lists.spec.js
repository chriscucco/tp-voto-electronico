const {getLists, getListsByID, getListByName, createList, showAllLists} = require('../../../../controllers/lists/lists')
var mockDb = require('mock-knex');

var db = require('../../../../dao/db')
var tracker = require('mock-knex').getTracker();


describe('Testing lists functions', () => {
    beforeAll(() => {
      mockDb.mock(db);
      tracker.install();
    });

    afterAll(() => {
      mockDb.unmock(db);
    });

    test('testGetLists', async () => {
        const req = {};
        const res = {};
        tracker.on('query', function sendResult(query) {
          query.response([
            {list_id: '1', name:'Partido 1'},
            {list_id: '2', room_id:'Partido 2'},
          ]);
        });
  
        const response = await getLists(req, res)
        expect(response.length).toEqual(2);
    });

    test('testGetListsByID', async () => {
        const req = {
            query: {
              list_id: '1'
            }
        };
        const res = {};
        tracker.on('query', function sendResult(query) {
          query.response([
            {list_id: '1', name:'Partido 1'},
          ]);
        });
  
        const response = await getListsByID(req, res)
        expect(response.length).toEqual(1);
    });

    test('testGetListByName', async () => {
        const req = {
            query: {
              name: 'Partido 1'
            }
        };
        const res = {};
        tracker.on('query', function sendResult(query) {
          query.response([
            {list_id: '1', name:'Partido 1'},
          ]);
        });
  
        const response = await getListByName(req, res)
        expect(response.length).toEqual(1);
    });

    test('testCreateList', async () => {
        tracker.on('query', function sendResult(query) {
            query.response([]);
          });
          const req = {
            body: {
              listId: '1',
              listName: 'Partido 1',
            },
          };
          const res = {};
    
          const response = await createList(req, res);
          expect(response.valid).toEqual(true);
    });

    test('testCreateListFailsNoName', async () => {
        tracker.on('query', function sendResult(query) {
            query.response([]);
          });
          const req = {
            body: {
              listId: '1',
            },
          };
          const res = {};
    
          const response = await createList(req, res);
          expect(response.valid).toEqual(false);
    });

    test('testCreateListFailsNoListID', async () => {
        tracker.on('query', function sendResult(query) {
            query.response([]);
          });
          const req = {
            body: {
              listName: 'Partido 1',
            },
          };
          const res = {};
    
          const response = await createList(req, res);
          expect(response.valid).toEqual(false);
    });

    test('testCreateListDuplicated', async () => {
        tracker.on('query', function sendResult(query) {
            query.response([
                {list_id: '1', name:'Partido 1'},
            ]);
          });
          const req = {
            body: {
              listId: '1',
              listName: 'Partido 1',
            },
          };
          const res = {};
    
          const response = await createList(req, res);
          expect(response.valid).toEqual(false);
    });
});