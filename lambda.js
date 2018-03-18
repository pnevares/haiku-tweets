const haikuTweets = require('./lib');

exports.myHandler = (event, context, callback) => {
  haikuTweets()
    .then(result => callback(null, result))
    .catch(callback);
};
