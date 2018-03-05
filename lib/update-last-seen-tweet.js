const fs = require("fs");
const {promisify} = require("util");
const writeFile = promisify(fs.writeFile);

module.exports = id => {
  console.log("update-last-seen-tweet");

  const options = {
    encoding: "utf-8",
    flag: "w"
  };
  return writeFile("./last-seen-tweet", id, options);
};