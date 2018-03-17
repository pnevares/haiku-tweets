const waypointHaikus = require('./lib');

exports.myHandler = (event, context, callback) => {
  waypointHaikus()
    .then(result => callback(null, result))
    .catch(callback);
};
