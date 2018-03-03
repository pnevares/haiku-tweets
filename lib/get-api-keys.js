module.exports = () =>
  new Promise((resolve, reject) => {
    console.log("get-api-keys");
    
    try {
      const api_keys = require("../../waypointhaikus_api_keys.json");
      resolve(api_keys);
    } catch(e) {
      console.log("Couldn't find waypointhaikus_api_keys.json, ya dummy");
      reject(e);
    }
  });