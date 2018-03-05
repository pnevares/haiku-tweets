module.exports = tweets =>
  new Promise((resolve, reject) => {
    console.log("filter-timeline");

    const filteredTweets = tweets.data
      .filter(c => !(c.hasOwnProperty("retweeted_status") || c.user.screen_name === "WaypointHaikus"))
      .map(c => {
        const simpleText = c.full_text
          .replace(/(?:https?|ftp):\/\/[\n\S]+/g, " ") // strip urls
          // ^^ from https://stackoverflow.com/a/23571059/93305
          .replace(/[^a-zA-Z0-9]/g, " ") // strip non-alphanumerics
          .replace(/\s\s+/g, " ") // reduce consecutive whitespace
          .toLowerCase()
          .trim();
        return {
          id_str: c.id_str,
          created_at: c.created_at,
          screen_name: c.user.screen_name,
          full_text: c.full_text,
          simple_text: simpleText
        }
      });
    resolve(filteredTweets);
  });