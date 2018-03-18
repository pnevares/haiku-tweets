const AWS = require('aws-sdk');

module.exports = (config, prevLastSeenTweet, newLastSeenTweet) => {
  if (newLastSeenTweet !== undefined && prevLastSeenTweet !== newLastSeenTweet) {
    AWS.config.update(config.keys);
    const s3 = new AWS.S3({ apiVersion: '2006-03-01' });

    const params = config.s3;
    params.Body = newLastSeenTweet;

    return s3.putObject(params)
      .promise();
  }

  return Promise.resolve();
};
