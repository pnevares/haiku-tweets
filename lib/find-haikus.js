const syllable = require("syllable");

module.exports = (tweets) =>
  new Promise((resolve, reject) => {
    console.log("find-haikus");

    const haikuTweets = tweets.filter(c => {
      return syllable(c.simple_text) === 17;
    }).map(c => {
      // inspired by https://github.com/sparkbox/commit-haikus/blob/master/utils.js
      const haiku = ["", "", ""];
      const words = c.simple_text.split(" ");
      
      // part 1
      while(syllable(haiku[0]) < 5 && words.length) {
        haiku[0] += words.shift() + " ";
      }
      if (syllable(haiku[0]) !== 5) {
        return;
      }

      // part 2
      while(syllable(haiku[1]) < 7 && words.length) {
        haiku[1] += words.shift() + " ";
      }
      if (syllable(haiku[1]) !== 7) {
        return;
      }
      
      // part 3
      while(syllable(haiku[2]) < 5 && words.length) {
        haiku[2] += words.shift() + " ";
      }
      if (syllable(haiku[2]) !== 5) {
        return;
      }

      c.haiku_text = haiku.join("\n");
      return c;
    });

    resolve(haikuTweets);
  });