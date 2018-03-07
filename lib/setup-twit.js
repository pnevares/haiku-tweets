const Twit = require("twit");

module.exports = credentials =>
  new Promise((resolve, reject) => {
    const t = new Twit({
      consumer_key: credentials.consumer_key,
      consumer_secret: credentials.consumer_secret,
      access_token: credentials.access_token,
      access_token_secret: credentials.access_token_secret,
      timeout_ms: 60 * 1000,
    });
    resolve(t);
  });