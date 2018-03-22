/* eslint-disable no-underscore-dangle */

const AWS = require('aws-sdk'); // __mocks__
const config = require('../../config.json'); // __mocks__
const updateLastSeenTweet = require('../update-last-seen-tweet');

describe('update-last-seen-tweet', () => {
  afterEach(() => {
    AWS.__reset();
  });

  it('should resolve immediately if newLastSeenTweet is undefined', () => {
    AWS.__setReturnValue('abc');
    return expect(updateLastSeenTweet(config.aws, 1, undefined)).resolves.toEqual();
  });

  it('should resolve immediately if parameters are equal', () => {
    AWS.__setReturnValue('def');
    return expect(updateLastSeenTweet(config.aws, 1, 1)).resolves.toEqual();
  });

  it('should resolve with s3.putObject if both parameters are unequal numbers', () => {
    AWS.__setReturnValue('ghi');
    return expect(updateLastSeenTweet(config.aws, 1, 2)).resolves.toEqual('ghi');
  });

  it('should resolve with s3.putObject if prevLastSeenTweet was undefined', () => {
    AWS.__setReturnValue('jkl');
    return expect(updateLastSeenTweet(config.aws, undefined, 2)).resolves.toEqual('jkl');
  });

  it('should reject with s3.putObject if an error is thrown', () => {
    AWS.__throwS3PutObject('mno');
    return expect(updateLastSeenTweet(config.aws, undefined, 2)).rejects.toThrow('mno');
  });

  it('should not mutate the config.aws.s3 object after running', () => {
    AWS.__setReturnValue('pqr');
    return updateLastSeenTweet(config.aws, 1, 2)
      .then((results) => {
        expect(config.aws.s3).toEqual({ Bucket: 'Bucket', Key: 'Key' });
        return expect(results).toEqual('pqr');
      });
  });
});
