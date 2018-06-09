const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

module.exports = (config) => {
  AWS.config.update(config.keys);
  const s3 = new AWS.S3({ apiVersion: '2006-03-01' });

  return s3.getObject(config.s3)
    .promise()
    .then(data => data.Body.toString('utf-8'))
    .catch((error) => {
      if (error.statusCode === 404) {
        return undefined;
      }

      throw new Error(error);
    });
};

