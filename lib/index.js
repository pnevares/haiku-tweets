const getApiKeys = require("./get-api-keys");
const getLastSeenTweet = require("./get-last-seen-tweet");
const setupTwit = require("./setup-twit");
const getTimeline = require("./get-timeline");
const filterTimeline = require("./filter-timeline");
const findHaikus = require("./find-haikus");
const sendTweet = require("./send-tweet");

Promise
  .all([
    getApiKeys(),  // retrieve api keys from storage
    getLastSeenTweet() // retrieve Id of last seen tweet
  ])
  .then(([apiKeys, lastSeenTweet]) => {
    return setupTwit(apiKeys);
  })
  // .then(sendTweet) // hello world
  .then(getTimeline) // listen for new tweets from waypoint-affiliated accounts
  .then(filterTimeline)
  .then(findHaikus) // see if a tweet can be made into a haiku
  // .then(sendTweet) // quote (each) tweet and post the haiku from @WaypointHaikus
  .then(result => {
    // console.log("result data length: ", result.data.length);
    // console.log("result data 0: ", result.data[0]);
    console.log(result);
  })
  .catch(error => {
    console.log("Promise error caught:", error);
  });