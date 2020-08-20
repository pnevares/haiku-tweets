const Twit = require('twit');

module.exports = (config) => new Promise((resolve) => {
  const t = new Twit({
    consumer_key: config.keys.consumer_key,
    consumer_secret: config.keys.consumer_secret,
    access_token: config.keys.access_token,
    access_token_secret: config.keys.access_token_secret,
    timeout_ms: 60 * 1000,
  });
  return resolve(t);
});
