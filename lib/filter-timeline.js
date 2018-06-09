module.exports = (account, tweets) =>
  new Promise((resolve) => {
    const filteredTweets = tweets.data
      .filter(c => !('retweeted_status' in c || c.user.screen_name === account))
      .map((c) => {
        const simpleText = c.full_text
          .replace(/(?:https?|ftp):\/\/[\n\S]+/g, ' ') // strip urls
          // ^^ from https://stackoverflow.com/a/23571059/93305
          .replace(/&amp;/g, ' and ') // turn ampersands into a word
          .replace(/[^a-zA-Z0-9'’]/g, ' ') // strip non-alphanumerics
          .replace(/'|’/g, '') // https://github.com/words/syllable/issues/18
          .replace(/\s\s+/g, ' ') // reduce consecutive whitespace
          .trim();
        return {
          id_str: c.id_str,
          created_at: c.created_at,
          screen_name: c.user.screen_name,
          full_text: c.full_text,
          simple_text: simpleText,
        };
      });
    resolve(filteredTweets);
  });
