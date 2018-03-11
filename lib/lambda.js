const waypointHaikus = require('./index');

exports.myHandler = (event, context, callback) => {
  waypointHaikus()
    .then(result => callback(null, result))
    .catch(callback);
};
