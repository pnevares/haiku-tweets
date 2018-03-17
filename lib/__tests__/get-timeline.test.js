const getTimeline = require('../get-timeline');

describe('get-timeline', () => {
  let get;
  let twitterApi;

  beforeEach(() => {
    get = jest.fn().mockResolvedValue('got');
    twitterApi = { get };
  });

  it('should handle an undefined lastSeenTweet', () => getTimeline(twitterApi)
    .then((results) => {
      expect(results).toEqual('got');
      expect(get).toHaveBeenCalledWith('statuses/home_timeline', { tweet_mode: 'extended', count: 200 });
    }));

  it('should handle a defined lastSeenTweet', () => getTimeline(twitterApi, '12345')
    .then((results) => {
      expect(results).toEqual('got');
      expect(get).toHaveBeenCalledWith('statuses/home_timeline', { since_id: '12345', tweet_mode: 'extended', count: 200 });
    }));
});
