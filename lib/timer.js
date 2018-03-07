const waypointHaikus = require("./index");

const checkAndTweet = () => {
  console.log("\n\n");
  waypointHaikus();
}

setInterval(checkAndTweet, 10 * 1000);