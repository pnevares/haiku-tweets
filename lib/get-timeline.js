t.get("statuses/home_timeline")
  .then(result => {
    result.data.forEach(c => {
      if (!c.hasOwnProperty("retweeted_status")) {
        console.log(c.user.screen_name, " | ", c.text);
      }
    });
  })
  .catch(error => {
    console.log("statuses/home_timeline error:");
    console.log(error);
  });