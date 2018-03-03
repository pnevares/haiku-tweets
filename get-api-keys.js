let api_keys;

try {
  api_keys = require("../waypointhaikus_api_keys.json");
} catch(e) {
  console.log("Couldn't find waypointhaikus_api_keys.json, ya dummy");
  console.log(e);
  api_keys = e;
}

module.exports = api_keys;