Promise.resolve(getApiKeys) // retrieve api keys from storage
  .then(setupTwit) // authenticate with twitter api
  .then(getTimeline) // listen for new tweets from waypoint-affiliated accounts
  .then(findHaikus) // see if a tweet can be made into a haiku
  .then(sendTweets); // quote tweet and tweet the haiku from @WaypointHaikus