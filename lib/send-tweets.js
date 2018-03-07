module.exports = (t, tweets) => {
  // console.log("send-tweet");

  // console.log(`Preparing ${tweets.length} tweets`);
  const tweetPromises = tweets.map(c => {
    console.log(`Preparing tweet for ${c.screen_name} ${c.id_str}`);

    const url = `https://twitter.com/${c.screen_name}/status/${c.id_str}`;
    const status = c.haiku_text + "\n" + url;
    return t.post('statuses/update', {status: status});
  });

  if (!tweetPromises.length) {
    console.log("(Nothing to tweet)")
  }

  return Promise.all(tweetPromises);
}