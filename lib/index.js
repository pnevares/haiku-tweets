const getApiKeys = require("./get-api-keys");
const getLastSeenTweet = require("./get-last-seen-tweet");
const setupTwit = require("./setup-twit");
const getTimeline = require("./get-timeline");
const filterTimeline = require("./filter-timeline");
const findHaikus = require("./find-haikus");
const sendTweets = require("./send-tweets");
const updateLastSeenTweet = require("./update-last-seen-tweet");

let twitterApi;
let lastSeenTweet;

Promise
  .all([
    getLastSeenTweet(),
    getApiKeys()
  ])
  .then(([id, apiKeys]) => {
    lastSeenTweet = id;
    return setupTwit(apiKeys);
  })
  .then(connection => {
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
  .then(result => {
    console.log(result);
    console.log(`Writing ${lastSeenTweet} to last-seen-tweet`);
    return updateLastSeenTweet(lastSeenTweet);
  })
  .then(result => {
    console.log(result);
  })
  .catch(error => {
    console.log("Promise error caught:", error);
  });