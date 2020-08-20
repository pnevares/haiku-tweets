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

  it('returns compliant tweets', () => expect(filterTimeline('account', tweets)).resolves.toHaveLength(2));

  it('removes retweets from a timeline', () => {
    tweets.data[0].retweeted_status = true;

    return expect(filterTimeline('account', tweets)).resolves.toHaveLength(1);
  });

  it('removes the bot account\'s tweets from the timeline', () => {
    tweets.data[0].user.screen_name = 'account';

    return expect(filterTimeline('account', tweets)).resolves.toHaveLength(1);
  });

  it('creates simple_text based on full_text', () => expect(filterTimeline('account', tweets))
    .resolves.toEqual(expect.arrayContaining([
      expect.objectContaining({ simple_text: 'Just a tweet!' }),
    ])));

  it('removes urls from full_text', () => {
    tweets.data[0].full_text = 'Just a tweet! https://t.co/abc123/#12345';

    return expect(filterTimeline('account', tweets)).resolves.toEqual(expect.arrayContaining([
      expect.objectContaining({ simple_text: 'Just a tweet!' }),
    ]));
  });

  it('removes some special characters from full_text', () => {
    tweets.data[0].full_text = 'Just, y\'know, a... -- tweet;';

    return expect(filterTimeline('account', tweets)).resolves.toEqual(expect.arrayContaining([
      expect.objectContaining({ simple_text: 'Just, y\'know, a... -- tweet;' }),
    ]));
  });

  it('contracts words with apostrophes in full_text', () => {
    tweets.data[0].full_text = 'it\'s they\'re we\'ve';

    return expect(filterTimeline('account', tweets)).resolves.toEqual(expect.arrayContaining([
      expect.objectContaining({ simple_text: 'it\'s they\'re we\'ve' }),
    ]));
  });

  it('swaps ampersands with the word "and"', () => {
    tweets.data[0].full_text = 'apples &amp; oranges';

    return expect(filterTimeline('account', tweets)).resolves.toEqual(expect.arrayContaining([
      expect.objectContaining({ simple_text: 'apples and oranges' }),
    ]));
  });

  it('can handle an empty array of tweets', () => {
    tweets.data = [];

    return expect(filterTimeline('account', tweets)).resolves.toHaveLength(0);
  });

  it('rejects on a badly-formatted tweet', () => {
    delete tweets.data[0].full_text;

    return expect(filterTimeline('account', tweets)).rejects.toThrow();
  });

  describe('can handle real-world tweets', () => {
    it('with a strange apostrophe', () => {
      // https://twitter.com/NatalieWatson/status/1005181242747314182
      tweets.data[0].full_text = 'the BB in BloodBorne stands for Big Boy sorry i don’t make the rules';

      return expect(filterTimeline('account', tweets)).resolves.toEqual(expect.arrayContaining([
        expect.objectContaining({ simple_text: 'the BB in BloodBorne stands for Big Boy sorry i don’t make the rules' }),
      ]));
    });
  });
});
