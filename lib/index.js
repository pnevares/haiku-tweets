const getApiKeys = require('./get-api-keys');
const getLastSeenTweet = require('./get-last-seen-tweet');
const setupTwit = require('./setup-twit');
const getTimeline = require('./get-timeline');
const filterTimeline = require('./filter-timeline');
const findHaikus = require('./find-haikus');
const sendTweets = require('./send-tweets');
const updateLastSeenTweet = require('./update-last-seen-tweet');

module.exports = () => {
  let twitterApi;
  let lastSeenTweet;

  return Promise
    .all([
      getLastSeenTweet(),
      getApiKeys(),
    ])
    .then(([id, apiKeys]) => {
      lastSeenTweet = id;
      return setupTwit(apiKeys);
    })
    .then((connection) => {
      twitterApi = connection;
      return getTimeline(twitterApi, lastSeenTweet);
    })
    .then((tweets) => {
      if (tweets.data.length) {
        lastSeenTweet = tweets.data[0].id_str;
      }
      return filterTimeline(tweets);
    })
    .then(findHaikus)
    .then(haikuTweets => sendTweets(twitterApi, haikuTweets))
    .then((results) => {
      const tweets = results.map(c => c.data.errors || `https://twitter.com/WaypointHaikus/status/${c.data.id_str}`);

      return updateLastSeenTweet(lastSeenTweet)
        .then(() => ({ success: { lastSeenTweet, tweets } }));
    });
};
