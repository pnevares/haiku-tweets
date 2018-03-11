const AWS = require('aws-sdk');

module.exports = (prevLastSeenTweet, newLastSeenTweet) => {
  if (newLastSeenTweet !== undefined && prevLastSeenTweet !== newLastSeenTweet) {
    AWS.config.loadFromPath('./aws_api_keys.json');
    const s3 = new AWS.S3({ apiVersion: '2006-03-01' });

    const params = {
      Body: newLastSeenTweet,
      Bucket: 'waypoint-haikus',
      Key: 'last-seen-tweet',
    };

    return s3.putObject(params)
      .promise();
  }

  return Promise.resolve();
};
