module.exports = (t, lastSeenTweet) =>
  new Promise((resolve, reject) => {
    console.log("get-timeline");

    const options = {
      since_id: lastSeenTweet,
      tweet_mode: "extended",
      count: 100
    };

    t.get("statuses/home_timeline", options)
      .then(result => resolve(result))
      // result.data.forEach(c => {
      //   if (!c.hasOwnProperty("retweeted_status")) {
      //     console.log(c.user.screen_name, " | ", c.text);
      //   }
      // });
      .catch(error => reject(error));
  });