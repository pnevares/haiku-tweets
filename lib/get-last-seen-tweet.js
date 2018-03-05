const fs = require("fs");
const {promisify} = require("util");
const readFile = promisify(fs.readFile);

module.exports = () => {
  console.log("get-last-seen-tweet");

  return readFile("./last-seen-tweet", "utf-8");
};