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

  Promise
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
      if (!tweets.data.length || lastSeenTweet === tweets.data[0].id_str) {
        throw new Error('No updates this cycle');
      }
      lastSeenTweet = tweets.data[0].id_str;
      return filterTimeline(tweets);
    })
    .then(findHaikus)
    .then(haikuTweets => sendTweets(twitterApi, haikuTweets))
    .then((result) => {
      if (result.length) {
        result.forEach((c) => {
          console.log(c.data.errors || // eslint-disable-line no-console
            `https://twitter.com/WaypointHaikus/status/${result[0].data.id_str}`);
        });
      }

      console.log(`Writing ${lastSeenTweet} to last-seen-tweet`); // eslint-disable-line no-console
      return updateLastSeenTweet(lastSeenTweet);
    })
    .catch((error) => {
      console.log('Promise error caught:', error.message); // eslint-disable-line no-console
    });
};
