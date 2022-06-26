const {isValidUserID} = require('../../../../controllers/external/validation')

describe('Testing external functions', () => {
    test('testiIValidUserID', async () => {
      const response = await isValidUserID('123');
      expect(response).toEqual(true);
    });
});