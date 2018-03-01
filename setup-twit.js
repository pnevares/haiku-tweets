const Twit = require("twit");

const t = new Twit({
  consumer_key: api_keys.consumer_key,
  consumer_secret: api_keys.consumer_secret,
  access_token: api_keys.access_token,
  access_token_secret: api_keys.access_token_secret,
  timeout_ms: 60 * 1000,
});