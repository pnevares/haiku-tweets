const apiKeys = require('../../waypointhaikus_api_keys.json');

module.exports = () =>
  new Promise((resolve) => {
    resolve(apiKeys);
  });
