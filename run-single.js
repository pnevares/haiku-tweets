const singleTweet = require('./lib/single');

singleTweet('1006345035820888065')
  .then(console.log)
  .catch(console.log);
