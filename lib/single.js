const getConfig = require('./get-config');
const setupTwit = require('./setup-twit');
const getTweet = require('./get-tweet');
const filterTimeline = require('./filter-timeline');
const findHaiku = require('./find-haiku');

module.exports = (tweetId) => {
  let config;
  let twitterApi;

  return getConfig()
    .then((c) => {
      config = c;
      return setupTwit(config.twitter);
    })
    .then((connection) => {
      twitterApi = connection;
      return getTweet(twitterApi, tweetId);
    })
    .then((tweets) => filterTimeline(config.twitter.account, tweets))
    .then(findHaiku)
    .then((tweets) => tweets.data.text);
};
