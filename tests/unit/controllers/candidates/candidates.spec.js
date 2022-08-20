const {getAllCandidates, getCandidatesByListID, getCandidatesByRoles, getCandidatesByID, getCandidatesByName, getCandidatesFromListIDAndRole, createCandidate} = require('../../../../controllers/candidates/candidates')
var mockDb = require('mock-knex');

var db = require('../../../../dao/db')
var tracker = require('mock-knex').getTracker();


describe('Testing candidates functions', () => {
    beforeAll(() => {
      mockDb.mock(db);
      tracker.install();
    });

    afterAll(() => {
      mockDb.unmock(db);
    });

    test('testGetAllCandidates', async () => {
        const req = {};
        const res = {};
        tracker.on('query', function sendResult(query) {
          query.response([
            {candidate_id: '1', list_id:'1', name: 'testName', role: 'President'},
            {candidate_id: '2', list_id:'1', name: 'testName2', role: 'Other'},
          ]);
        });
  
        const response = await getAllCandidates(req, res)
        expect(response.length).toEqual(2);
    });

    test('testGetCandidatesByListID', async () => {
        const req = {
            query: {
                list_id: '1'
            }
        };
        const res = {};
        tracker.on('query', function sendResult(query) {
          query.response([
            {candidate_id: '1', list_id:'1', name: 'testName', role: 'President'},
          ]);
        });
  
        const response = await getCandidatesByListID(req, res)
        expect(response.length).toEqual(1);
    });

    test('testGetCandidatesByRoles', async () => {
        const req = {
            query: {
                role: 'President'
            }
        };
        const res = {};
        tracker.on('query', function sendResult(query) {
          query.response([
            {candidate_id: '1', list_id:'1', name: 'testName', role: 'President'},
          ]);
        });
  
        const response = await getCandidatesByRoles(req, res)
        expect(response.length).toEqual(1);
    });

    test('testGetCandidatesByCandidateID', async () => {
        const req = {
            query: {
                candidate_id: '1'
            }
        };
        const res = {};
        tracker.on('query', function sendResult(query) {
          query.response([
            {candidate_id: '1', list_id:'1', name: 'testName', role: 'President'},
          ]);
        });
  
        const response = await getCandidatesByID(req, res)
        expect(response.length).toEqual(1);
    });

    test('testGetCandidatesByName', async () => {
        const req = {
            query: {
                name: 'testName'
            }
        };
        const res = {};
        tracker.on('query', function sendResult(query) {
          query.response([
            {candidate_id: '1', list_id:'1', name: 'testName', role: 'President'},
          ]);
        });
  
        const response = await getCandidatesByName(req, res)
        expect(response.length).toEqual(1);
    });

    test('testGetCandidatesFromListIDAndRole', async () => {
        const req = {
            query: {
                role: 'President',
                list_id: '1',
            }
        };
        const res = {};
        tracker.on('query', function sendResult(query) {
          query.response([
            {candidate_id: '1', list_id:'1', name: 'testName', role: 'President'},
          ]);
        });
  
        const response = await getCandidatesFromListIDAndRole(req, res)
        expect(response.length).toEqual(1);
    });

    test('testCreateCandidate', async () => {
        tracker.on('query', function sendResult(query) {
            query.response([]);
          });
          const req = {
            body: {
              candidate_id: '1',
              list_id: '1',
              name: 'testName',
              role: 'President',
            },
          };
          const res = {};
    
          const response = await createCandidate(req, res);
          expect(response.valid).toEqual(true);
    });

    test('testCreateCandidateFailsNoCandidateID', async () => {
        tracker.on('query', function sendResult(query) {
            query.response([]);
          });
          const req = {
            body: {
              list_id: '1',
              name: 'testName',
              role: 'President',
            },
          };
          const res = {};
    
          const response = await createCandidate(req, res);
          expect(response.valid).toEqual(false);
    });

    test('testCreateCandidateFailsNoListID', async () => {
        tracker.on('query', function sendResult(query) {
            query.response([]);
          });
          const req = {
            body: {
              candidate_id: '1',
              name: 'testName',
              role: 'President',
            },
          };
          const res = {};
    
          const response = await createCandidate(req, res);
          expect(response.valid).toEqual(false);
    });

    test('testCreateCandidateFailsNoName', async () => {
        tracker.on('query', function sendResult(query) {
            query.response([]);
          });
          const req = {
            body: {
              candidate_id: '1',
              list_id: '1',
              role: 'President',
            },
          };
          const res = {};
    
          const response = await createCandidate(req, res);
          expect(response.valid).toEqual(false);
    });

    test('testCreateCandidateFailsNoRole', async () => {
        tracker.on('query', function sendResult(query) {
            query.response([]);
          });
          const req = {
            body: {
              candidate_id: '1',
              list_id: '1',
              name: 'testName',
            },
          };
          const res = {};
    
          const response = await createCandidate(req, res);
          expect(response.valid).toEqual(false);
    });
    
    test('testCreateCandidateFailsDuplicated', async () => {
        tracker.on('query', function sendResult(query) {
            query.response([
                {candidate_id: '1', list_id:'1', name: 'testName', role: 'President'},
            ]);
          });
          const req = {
            body: {
              candidate_id: '1',
              list_id: '1',
              name: 'testName',
              role: 'President',
            },
          };
          const res = {};
    
          const response = await createCandidate(req, res);
          expect(response.valid).toEqual(false);
    });
});