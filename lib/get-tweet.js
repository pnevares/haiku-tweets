module.exports = (t, tweetId) => {
  const options = {
    id: tweetId,
  };

  return t.get('statuses/show', options);
};
