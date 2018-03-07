module.exports = (t, lastSeenTweet) => {
  const options = {
    since_id: lastSeenTweet || undefined,
    tweet_mode: "extended",
    count: 200
  };

  return t.get("statuses/home_timeline", options);
}