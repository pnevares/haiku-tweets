module.exports = (t, tweets) => {
  const tweetPromises = tweets.map((c) => {
    console.log(`Preparing tweet for ${c.screen_name} ${c.id_str}`); // eslint-disable-line no-console

    const url = `https://twitter.com/${c.screen_name}/status/${c.id_str}`;
    const status = `${c.haiku_text}\n${url}`;
    return t.post('statuses/update', { status });
  });

  return Promise.all(tweetPromises);
};
