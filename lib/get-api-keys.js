module.exports = () =>
  new Promise((resolve, reject) => {
    const api_keys = require("../../waypointhaikus_api_keys.json");
    resolve(api_keys);
  });