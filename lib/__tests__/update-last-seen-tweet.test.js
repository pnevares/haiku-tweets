/* eslint-disable no-underscore-dangle */

const AWS = require('aws-sdk'); // __mocks__
const updateLastSeenTweet = require('../update-last-seen-tweet');

describe('update-last-seen-tweet', () => {
  it('should resolve immediately if newLastSeenTweet is undefined', () => {
    AWS.__setReturnValue('abc');
    return expect(updateLastSeenTweet({ keys: 'keys', s3: 's3' }, 1, undefined)).resolves.toEqual();
  });

  it('should resolve immediately if parameters are equal', () => {
    AWS.__setReturnValue('def');
    return expect(updateLastSeenTweet({ keys: 'keys', s3: 's3' }, 1, 1)).resolves.toEqual();
  });

  it('should resolve with s3.putObject if both parameters are unequal numbers', () => {
    AWS.__setReturnValue('ghi');
    return expect(updateLastSeenTweet({ keys: 'keys', s3: 's3' }, 1, 2)).resolves.toEqual('ghi');
  });

  it('should resolve with s3.putObject if prevLastSeenTweet was undefined', () => {
    AWS.__setReturnValue('jkl');
    return expect(updateLastSeenTweet({ keys: 'keys', s3: 's3' }, undefined, 2)).resolves.toEqual('jkl');
  });

  it('should reject with s3.putObject if an error is thrown', () => {
    AWS.__throwS3PutObject('mno');
    return expect(updateLastSeenTweet({ keys: 'keys', s3: 's3' }, undefined, 2)).rejects.toThrow('mno');
  });
});
