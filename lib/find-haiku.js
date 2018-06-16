const syllable = require('syllable');

// avoids https://github.com/words/syllable/issues/18
const countSyllables = text => syllable(text.replace(/'|’/g, ''));

module.exports = tweets =>
  new Promise((resolve) => {
    const haikuTweets = tweets.filter(c => countSyllables(c.simple_text) === 17).reduce((a, c) => {
      // skip tweets containing numbers (until they can be made into words)
      if (/\d/.test(c.simple_text)) {
        return a;
      }

      // inspired by https://github.com/sparkbox/commit-haikus/blob/master/utils.js
      const haiku = ['', '', ''];
      const words = c.simple_text.split(' ');

      // part 1
      while (countSyllables(haiku[0]) < 5 && words.length) {
        haiku[0] += `${words.shift()} `;
      }
      if (countSyllables(haiku[0]) !== 5) {
        return a;
      }

      // part 2
      while (countSyllables(haiku[1]) < 7 && words.length) {
        haiku[1] += `${words.shift()} `;
      }
      if (countSyllables(haiku[1]) !== 7) {
        return a;
      }

      // part 3
      while (countSyllables(haiku[2]) < 5 && words.length) {
        haiku[2] += `${words.shift()} `;
      }

      a.push(Object.assign({ haiku_text: haiku.join('\n') }, c));
      return a;
    }, []);

    resolve(haikuTweets);
  });
