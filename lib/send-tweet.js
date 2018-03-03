module.exports = (t, tweets) =>
  new Promise((resolve, reject) => {
    console.log("send-tweet");

    t.post('statuses/update', { status: 'hello world!' }, function(error, data, response) {
      if (error) {
        return reject(error);
      }
      resolve(data);
    });
  })