module.exports = () =>
  new Promise((resolve, reject) => {
    // console.log("get-api-keys");

    const api_keys = require("../../waypointhaikus_api_keys.json");
    resolve(api_keys);
  });