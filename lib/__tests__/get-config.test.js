const getConfig = require('../get-config');

describe('get-config', () => {
  it('resolves with the app config', () => expect(getConfig()).resolves.toEqual({
    twitter: {
      account: 'account',
      keys: {
        consumer_key: 'consumer_key',
        consumer_secret: 'consumer_secret',
        access_token: 'access_token',
        access_token_secret: 'access_token_secret',
      },
    },
    aws: {
      keys: {
        accessKeyId: 'accessKeyId',
        secretAccessKey: 'secretAccessKey',
        region: 'region',
      },
      s3: {
        Bucket: 'Bucket',
        Key: 'Key',
      },
    },
  }));
});
