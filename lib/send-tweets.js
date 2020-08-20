module.exports = (t, tweets) => {
  const tweetPromises = tweets.map((c) => {
    const url = `https://twitter.com/${c.screen_name}/status/${c.id_str}`;
    const status = `${c.haiku_text}\n${url}`;
    return t.post('statuses/update', { status })
      .catch((error) => error);
  });

  return Promise.all(tweetPromises);
};
