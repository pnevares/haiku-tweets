const waypointHaikus = require('./index');

const checkAndTweet = () => {
  console.log('\n'); // eslint-disable-line no-console
  waypointHaikus();
};

setInterval(checkAndTweet, 1.5 * 60 * 1000);
