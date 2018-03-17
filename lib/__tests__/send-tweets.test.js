const sendTweets = require('../send-tweets');

describe('send-tweets', () => {
  let post;
  let twitterApi;

  beforeEach(() => {
    post = jest.fn().mockResolvedValue('posted');
    twitterApi = { post };
  });

  it('can resolve provided an empty array of tweets', () => sendTweets(twitterApi, [])
    .then((result) => {
      expect(result).toEqual([]);
      expect(post).not.toHaveBeenCalled();
    }));

  it('resolves after calling twitterApi once for each tweet', () => {
    const tweets = [
      { screen_name: 'user1', id_str: '1', haiku_text: 'abc' },
      { screen_name: 'user2', id_str: '2', haiku_text: 'def' },
      { screen_name: 'user3', id_str: '3', haiku_text: 'ghi' },
    ];

    return sendTweets(twitterApi, tweets)
      .then((result) => {
        expect(result).toHaveLength(3);
        expect(post).toHaveBeenCalledTimes(3);
      });
  });

  it('rejects when twitterApi throws', () => {
    post = jest.fn().mockRejectedValue('postError');
    twitterApi = { post };

    const tweets = [
      { screen_name: 'user1', id_str: '1', haiku_text: 'abc' },
    ];

    return expect(sendTweets(twitterApi, tweets)).rejects.toEqual('postError');
  });
});
