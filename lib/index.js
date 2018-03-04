const getApiKeys = require("./get-api-keys");
const getLastSeenTweet = require("./get-last-seen-tweet");
const setupTwit = require("./setup-twit");
const getTimeline = require("./get-timeline");
const filterTimeline = require("./filter-timeline");
const findHaikus = require("./find-haikus");
const sendTweets = require("./send-tweets");

Promise
  .all([
    getApiKeys(),  // retrieve api keys from storage
    getLastSeenTweet() // retrieve Id of last seen tweet
  ])
  .then(([apiKeys, lastSeenTweet]) => Promise.all([lastSeenTweet, setupTwit(apiKeys)]))
  .then(([lastSeenTweet, t]) => Promise.all([t, getTimeline(t, lastSeenTweet)]))
  .then(([t, tweets]) => Promise.all([t, filterTimeline(tweets)]))
  .then(([t, filteredTweets]) => Promise.all([t, findHaikus(filteredTweets)]))
  .then(([t, haikuTweets]) => sendTweets(t, haikuTweets))
  .then(result => {
    // console.log("result data length: ", result.data.length);
    // console.log("result data 0: ", result.data[0]);
    console.log(result);
  })
  .catch(error => {
    console.log("Promise error caught:", error);
  });