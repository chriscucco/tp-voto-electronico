const {getRoles, getRoleByID, createRole, updateRole, updateRoleByUserOrDNI} = require('../../../../controllers/roles/roles')
var mockDb = require('mock-knex');
var db = require('../../../../dao/db');
var tracker = require('mock-knex').getTracker();



describe('Testing roles functions', () => {
    beforeAll(() => {
      mockDb.mock(db);
      tracker.install();
    });

    afterAll(() => {
      mockDb.unmock(db);
    });


    test('testGetRoles', async () => {
      const req = {};
      const res = {};
      tracker.on('query', function sendResult(query) {
        query.response([
          {user_id: '1234', role: 'nominal'},
          {user_id: '5678', role: 'admin'},
        ]);
      });

      const response = await getRoles(req, res)
      expect(response.length).toEqual(2);
    });

    test('testGetRoleByID', async () => {
      const req = {
        query: {
          user_id: '1234'
        }
      };
      const res = {};
      tracker.on('query', function sendResult(query) {
        query.response([
          {user_id: '1234', role: 'nominal'}
        ]);
      });

      const response = await getRoleByID(req, res)
      expect(response.length).toEqual(1);
    });

    test('testGetRoleByIDNotSendButSuccess', async () => {
        const req = {
          query: {}
        };
        const res = {};
        tracker.on('query', function sendResult(query) {
          query.response([]);
        });
  
        const response = await getRoleByID(req, res)
        expect(response.length).toEqual(0);
    });

    test('testCreate', async () => {
        tracker.on('query', function sendResult(query) {
          query.response([]);
        });
        const req = {
          body: {
            user_id: '123',
            role: 'nominal'
          },
        };
        const res = {};
  
        const response = await createRole(req, res);
        expect(response.valid).toEqual(true);
    });

    test('testCreateFailsDuplicated', async () => {
      tracker.on('query', function sendResult(query) {
        query.response([
          {user_id: '123', role: 'nominal'},
        ]);
      });
      const req = {
        body: {
          user_id: '123',
          role: 'nominal'
        },
      };
      const res = {};

      const response = await createRole(req, res);
      expect(response.valid).toEqual(false);
  });

  test('testCreateInvalidUserID', async () => {
        tracker.on('query', function sendResult(query) {
          query.response([]);
        });
        const req = {
          body: {
            role: 'nominal'
          },
        };
        const res = {};
  
        const response = await createRole(req, res);
        expect(response.valid).toEqual(false);
    });

  test('testCreateInvalidRole', async () => {
        tracker.on('query', function sendResult(query) {
          query.response([]);
        });
        const req = {
          body: {
            user_id: '123',
          },
        };
        const res = {};
  
        const response = await createRole(req, res);
        expect(response.valid).toEqual(false);
    });

  test('testUpdateRole', async () => {
      tracker.on('query', function sendResult(query) {
        query.response([
          {user_id: '123', role: 'nominal'},
        ]);
      });
      const req = {
        body: {
          user_id: '123'
        },
      };
      const res = {};

      const response = await updateRole(req, res);
      expect(response.valid).toEqual(true);
  });

  test('testUpdateRoleFailsNoUserID', async () => {
    tracker.on('query', function sendResult(query) {
      query.response([
        {user_id: '123', role: 'nominal'},
      ]);
    });
    const req = {
      body: {},
    };
    const res = {};

    const response = await updateRole(req, res);
    expect(response.valid).toEqual(false);
});

  test('testUpdateRoleFailsNotExists', async () => {
    tracker.on('query', function sendResult(query) {
      query.response([]);
    });
    const req = {
      body: {
        user_id: '123'
      },
    };
    const res = {};

    const response = await updateRole(req, res);
    expect(response.valid).toEqual(false);
  });

  test('testUpdateRoleByUserOrDNI', async () => {
    tracker.on('query', function sendResult(query) {
      query.response([
        {user_id: '123', role: 'nominal'},
      ]);
    });
    const req = {
      body: {
        userInput: '123'
      },
    };
    const res = {};

    const response = await updateRoleByUserOrDNI(req, res);
    expect(response.valid).toEqual(true);
  });

  test('testUpdateRoleByUserOrDNIFailsNotFound', async () => {
    tracker.on('query', function sendResult(query) {
      query.response([]);
    });
    const req = {
      body: {
        userInput: '123'
      },
    };
    const res = {};

    const response = await updateRoleByUserOrDNI(req, res);
    expect(response.valid).toEqual(false);
  });

  test('testUpdateRoleByUserOrDNIFailsInvalidUserID', async () => {
    tracker.on('query', function sendResult(query) {
      query.response([
        {user_id: '123', role: 'nominal'},
      ]);
    });
    const req = {
      body: {},
    };
    const res = {};

    const response = await updateRoleByUserOrDNI(req, res);
    expect(response.valid).toEqual(false);
  });
});