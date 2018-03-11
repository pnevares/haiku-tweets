const AWS = require('aws-sdk');

AWS.config.loadFromPath('./aws_api_keys.json');
const s3 = new AWS.S3({ apiVersion: '2006-03-01' });


// read file

const params = {
  Bucket: 'waypoint-haikus',
  Key: 'last-seen-tweet',
};

// s3.getObject(params, (error, data) => {
//   if (error) {
//     console.log('error: ', error);
//   } else {
//     console.log('data: ', data);
//     console.log(data.Body.toString('utf-8'));
//   }
// });

// promise
s3.getObject(params)
  .promise()
  .then((data) => {
    console.log('data: ', data);
    console.log(data.Body.toString('utf-8'));    
  })
  .catch((error) => {
    console.log('error: ', error);
  });


// write file

// const params = {
//   Body: '321',
//   Bucket: 'waypoint-haikus',
//   Key: 'last-seen-tweet2',
// };

// s3.putObject(params, (error, data) => {
//   if (error) {
//     console.log('error: ', error);
//   } else {
//     console.log('data: ', data);
//   }
// });

// promise
// s3.putObject(params)
//   .promise()
//   .then((data) => {
//     console.log('data: ', data);
//   })
//   .catch((error) => {
//     console.log('error: ', error);
//   });