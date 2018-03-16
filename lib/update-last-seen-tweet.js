const AWS = require('aws-sdk');

AWS.config.loadFromPath('./aws_api_keys.json');
const s3 = new AWS.S3({ apiVersion: '2006-03-01' });

module.exports = (prevLastSeenTweet, newLastSeenTweet) => {
  if (newLastSeenTweet !== undefined && prevLastSeenTweet !== newLastSeenTweet) {
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
