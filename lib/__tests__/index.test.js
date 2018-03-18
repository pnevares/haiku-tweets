/* eslint-disable no-underscore-dangle */

const Twit = require('twit');
const haikuTweets = require('../');

describe('haiku-tweets index', () => {
  it('should return a resolved promise when there are new tweets', () =>
    expect(haikuTweets()).resolves.toEqual({
      success: { newLastSeenTweet: '2', prevLastSeenTweet: undefined, tweets: [] },
    }));

  it('should return a resolved promise when there are no new tweets', () => {
    Twit.__setTimeline({ data: [] });
    return expect(haikuTweets()).resolves.toEqual({
      success: { newLastSeenTweet: undefined, prevLastSeenTweet: undefined, tweets: [] },
    });
  });

  it('should return a resolved promise when a haiku tweet is found', () => {
    Twit.__setTimeline({
      data: [{
        id_str: '3',
        created_at: 'timestamp',
        full_text: 'A haiku is too easy to write! (when you have all the time you like)',
        user: {
          screen_name: 'username',
        },
      }],
    });
    Twit.__setResults({
      data: { id_str: '4' },
    });

    return expect(haikuTweets()).resolves.toEqual({
      success: { newLastSeenTweet: '3', prevLastSeenTweet: undefined, tweets: ['https://twitter.com/account/status/4'] },
    });
  });
});
