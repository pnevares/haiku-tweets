const getApiKeys = require('./get-api-keys');
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

  return getApiKeys()
    .then((apiKeys) => {
      config = apiKeys;
      return getLastSeenTweet();
    })
    .then((id) => {
      prevLastSeenTweet = id;
      return setupTwit(config);
    })
    .then((connection) => {
      twitterApi = connection;
      return getTimeline(twitterApi, prevLastSeenTweet);
    })
    .then((tweets) => {
      if (tweets.data.length) {
        newLastSeenTweet = tweets.data[0].id_str;
      }
      return filterTimeline(tweets);
    })
    .then(findHaikus)
    .then(haikuTweets => sendTweets(twitterApi, haikuTweets))
    .then((results) => {
      const tweets = results.map(c => c.data.errors || `https://twitter.com/WaypointHaikus/status/${c.data.id_str}`);

      return updateLastSeenTweet(prevLastSeenTweet, newLastSeenTweet)
        .then(() => ({ success: { prevLastSeenTweet, newLastSeenTweet, tweets } }));
    });
};
