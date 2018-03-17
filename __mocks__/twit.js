/* eslint-disable class-methods-use-this, no-underscore-dangle */

let timeline = {
  data: [
    {
      id_str: '2',
      created_at: 'timestamp',
      full_text: 'Just a tweet!',
      user: {
        screen_name: 'username',
      },
    },
    {
      id_str: '1',
      created_at: 'timestamp',
      full_text: 'Just a tweet!',
      user: {
        screen_name: 'username',
      },
    },
  ],
};

let results = {};

class Twit {
  get() {
    return Promise.resolve(timeline);
  }
  post() {
    return Promise.resolve(results);
  }
  static __setTimeline(data) {
    timeline = data;
  }
  static __setResults(data) {
    results = data;
  }
}

module.exports = Twit;
