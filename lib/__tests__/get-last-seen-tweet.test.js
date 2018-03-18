/* eslint-disable no-underscore-dangle */

const AWS = require('aws-sdk'); // __mocks__
const getLastSeenTweet = require('../get-last-seen-tweet');

describe('get-last-seen-tweet', () => {
  it('should resolve with a Promise', () => {
    AWS.__setReturnValue('hello');
    return expect(getLastSeenTweet({ keys: 'keys' })).resolves.toEqual('hello');
  });

  it('should absorb "missing object" errors', () => {
    AWS.__throwS3GetObject({ statusCode: 404 });
    return expect(getLastSeenTweet({ keys: 'keys' })).resolves.toEqual(undefined);
  });

  it('should reject with any other error', () => {
    AWS.__throwS3GetObject('any other error');
    return expect(getLastSeenTweet({ keys: 'keys' })).rejects.toThrow('any other error');
  });
});
