const AWS = require('aws-sdk');

AWS.config.loadFromPath('./aws_api_keys.json');
const s3 = new AWS.S3({ apiVersion: '2006-03-01' });

const params = {
  Bucket: 'waypoint-haikus',
  Key: 'last-seen-tweet',
};

module.exports = () => s3.getObject(params)
  .promise()
  .then(data => data.Body.toString('utf-8'))
  .catch((error) => {
    if (error.statusCode === 404) {
      return undefined;
    }

    throw new Error(error);
  });
