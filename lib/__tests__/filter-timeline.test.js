const filterTimeline = require('../filter-timeline');

let tweets;

describe('filter-timeline', () => {
  beforeEach(() => {
    tweets = {
      data: [
        {
          id_str: '1',
          created_at: 'timestamp',
          full_text: 'Just a tweet!',
          user: {
            screen_name: 'username',
          },
        },
        {
          id_str: '2',
          created_at: 'timestamp',
          full_text: 'Just a tweet!',
          user: {
            screen_name: 'username',
          },
        },
      ],
    };
  });

  it('returns compliant tweets', () => {
    expect.assertions(1);
    return expect(filterTimeline(tweets)).resolves.toHaveLength(2);
  });

  it('removes retweets from a timeline', () => {
    tweets.data[0].retweeted_status = true;

    expect.assertions(1);
    return expect(filterTimeline(tweets)).resolves.toHaveLength(1);
  });

  it('removes WaypointHaikus\' tweets from a timeline', () => {
    tweets.data[0].user.screen_name = 'WaypointHaikus';

    expect.assertions(1);
    return expect(filterTimeline(tweets)).resolves.toHaveLength(1);
  });

  it('simplifies full_text', () => {
    expect.assertions(1);
    return expect(filterTimeline(tweets))
      .resolves.toEqual(expect.arrayContaining([
        expect.objectContaining({ simple_text: 'just a tweet' }),
      ]));
  });

  it('removes urls from full_text', () => {
    tweets.data[0].full_text = 'Just a tweet! https://t.co/abc123/#12345';

    expect.assertions(1);
    return expect(filterTimeline(tweets)).resolves.toEqual(expect.arrayContaining([
      expect.objectContaining({ simple_text: 'just a tweet' }),
    ]));
  });

  it('removes some special characters from full_text', () => {
    tweets.data[0].full_text = 'Just, y\'know, a... -- tweet;';

    expect.assertions(1);
    return expect(filterTimeline(tweets)).resolves.toEqual(expect.arrayContaining([
      expect.objectContaining({ simple_text: 'just y\'know a tweet' }),
    ]));
  });

  it('can handle an empty array of tweets', () => {
    tweets.data = [];

    expect.assertions(1);
    return expect(filterTimeline(tweets)).resolves.toHaveLength(0);
  });

  it('rejects on a badly-formatted tweet', () => {
    delete tweets.data[0].full_text;

    expect.assertions(1);
    return expect(filterTimeline(tweets)).rejects.toThrow();
  });
});
