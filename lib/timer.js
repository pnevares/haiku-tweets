const waypointHaikus = require("./index");

const checkAndTweet = () => {
  console.log("\n");
  waypointHaikus();
}

setInterval(checkAndTweet, 1.5 * 60 * 1000);