const fs = require("fs");
const {promisify} = require("util");
const readFile = promisify(fs.readFile);

module.exports = () => readFile("./last-seen-tweet", "utf-8");