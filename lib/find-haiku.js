const syllable = require('syllable');

module.exports = tweets =>
  new Promise((resolve) => {
    const haikuTweets = tweets.filter(c => syllable(c.simple_text) === 17).reduce((a, c) => {
      // inspired by https://github.com/sparkbox/commit-haikus/blob/master/utils.js
      const haiku = ['', '', ''];
      const words = c.simple_text.split(' ');

      // part 1
      while (syllable(haiku[0]) < 5 && words.length) {
        haiku[0] += `${words.shift()} `;
      }
      if (syllable(haiku[0]) !== 5) {
        return a;
      }

      // part 2
      while (syllable(haiku[1]) < 7 && words.length) {
        haiku[1] += `${words.shift()} `;
      }
      if (syllable(haiku[1]) !== 7) {
        return a;
      }

      // part 3
      while (syllable(haiku[2]) < 5 && words.length) {
        haiku[2] += `${words.shift()} `;
      }

      a.push(Object.assign({ haiku_text: haiku.join('\n') }, c));
      return a;
    }, []);

    resolve(haikuTweets);
  });