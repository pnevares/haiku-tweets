const sendTweets = require('../send-tweets');

describe('send-tweets', () => {
  let post;
  let twitterApi;

  describe('can resolve', () => {
    beforeEach(() => {
      post = jest.fn().mockResolvedValue('posted');
      twitterApi = { post };
    });

    it('provided an empty array of tweets', () => sendTweets(twitterApi, [])
      .then((result) => {
        expect(result).toEqual([]);
        expect(post).not.toHaveBeenCalled();
      }));

    it('after calling twitterApi once for each tweet', () => {
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
  });

  describe('can handle a reject from twitterApi', () => {
    it('once', () => {
      post = jest.fn().mockRejectedValue(new Error('postError'));
      twitterApi = { post };

      const tweets = [
        { screen_name: 'user1', id_str: '1', haiku_text: 'abc' },
      ];

      return expect(sendTweets(twitterApi, tweets)).resolves.toEqual([new Error('postError')]);
    });

    it('multiple times', () => {
      post = jest.fn().mockRejectedValue(new Error('postError'));
      twitterApi = { post };

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

    it('mixed with resolves', () => {
      post = jest.fn()
        .mockResolvedValueOnce('posted')
        .mockRejectedValueOnce(new Error('postError'))
        .mockResolvedValueOnce('posted');
      twitterApi = { post };

      const tweets = [
        { screen_name: 'user1', id_str: '1', haiku_text: 'abc' },
        { screen_name: 'user2', id_str: '2', haiku_text: 'def' },
        { screen_name: 'user3', id_str: '3', haiku_text: 'ghi' },
      ];

      return sendTweets(twitterApi, tweets)
        .then((result) => {
          expect(result).toEqual([
            'posted',
            new Error('postError'),
            'posted',
          ]);
          expect(post).toHaveBeenCalledTimes(3);
        });
    });
  });
});
