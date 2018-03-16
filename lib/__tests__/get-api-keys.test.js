const getApiKeys = require('../get-api-keys');

describe('get-api-keys', () => {
  it('resolves with api credentials', () => {
    return expect(getApiKeys()).resolves.toEqual({
      consumer_key: 'consumer_key',
      consumer_secret: 'consumer_secret',
      access_token: 'access_token',
      access_token_secret: 'access_token_secret',
    });
  });
});
