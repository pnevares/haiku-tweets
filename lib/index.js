const getConfig = require('./get-config');
const getLastSeenTweet = require('./get-last-seen-tweet');
const setupTwit = require('./setup-twit');
const getTimeline = require('./get-timeline');
const filterTimeline = require('./filter-timeline');
const findHaikus = require('./find-haikus');
const sendTweets = require('./send-tweets');
const updateLastSeenTweet = require('./update-last-seen-tweet');

module.exports = () => {
  let config;
  let twitterApi;
  let prevLastSeenTweet;
  let newLastSeenTweet;

  return getConfig()
    .then((c) => {
      config = c;
      return getLastSeenTweet(config.aws);
    })
    .then((id) => {
      prevLastSeenTweet = id;
      return setupTwit(config.twitter);
    })
    .then((connection) => {
      twitterApi = connection;
      return getTimeline(twitterApi, prevLastSeenTweet);
    })
    .then((tweets) => {
      if (tweets.data.length) {
        newLastSeenTweet = tweets.data[0].id_str;
      }
      return filterTimeline(config.twitter.account, tweets);
    })
    .then(findHaikus)
    .then(haikuTweets => sendTweets(twitterApi, haikuTweets))
    .then((results) => {
      const tweets = results.map(c => c.data.errors || `https://twitter.com/${config.twitter.account}/status/${c.data.id_str}`);

      return updateLastSeenTweet(config.aws, prevLastSeenTweet, newLastSeenTweet)
        .then(() => ({ success: { prevLastSeenTweet, newLastSeenTweet, tweets } }));
    });
};
