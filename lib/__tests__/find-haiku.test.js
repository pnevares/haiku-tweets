const findHaiku = require('../find-haiku');

describe('find-haiku', () => {
  it('can identify a valid haiku', () => {
    const text = 'a haiku is too easy to write when you have all the time you like';
    const haiku = 'a haiku is too \neasy to write when you have \nall the time you like ';
    const tweets = [{ simple_text: text }];

    return expect(findHaiku(tweets)).resolves.toEqual([{
      simple_text: text,
      haiku_text: haiku,
    }]);
  });

  it('can identify a valid haiku with contractions', () => {
    const text = 'dont second guess a haiku when its missing its apostrophes friend';
    const haiku = 'dont second guess a \nhaiku when its missing its \napostrophes friend ';
    const tweets = [{ simple_text: text }];

    return expect(findHaiku(tweets)).resolves.toEqual([{
      simple_text: text,
      haiku_text: haiku,
    }]);
  });

  it('can identify an invalid haiku', () => {
    const text = 'a bad haiku is even easier to write';
    const tweets = [{ simple_text: text }];

    return expect(findHaiku(tweets)).resolves.toEqual([]);
  });

  it('can identify an invalid 17-syllable haiku in the first verse', () => {
    const text = 'a haiku is very nice to write when you have all the time you like';
    const tweets = [{ simple_text: text }];

    return expect(findHaiku(tweets)).resolves.toEqual([]);
  });

  it('can identify an invalid 17-syllable haiku in the second verse', () => {
    const text = 'a haiku is too easy to write when you really like doing them';
    const tweets = [{ simple_text: text }];

    return expect(findHaiku(tweets)).resolves.toEqual([]);
  });

  it('can identify a valid haiku containing punctuation', () => {
    const text = 'A haiku is too easy to write (when you have all the time you like)!';
    const haiku = 'A haiku is too \neasy to write (when you have \nall the time you like)! ';
    const tweets = [{ simple_text: text }];

    return expect(findHaiku(tweets)).resolves.toEqual([{
      simple_text: text,
      haiku_text: haiku,
    }]);
  });

  describe('handles real-world tweets as expected', () => {
    it('containing numbers (not counted by syllable module)', () => {
      // https://twitter.com/giantbomb/status/1005528542908645378
      const text = 'E3 2018 Loneliness Is Truly a Monster in Sea of Solitude';
      const tweets = [{ simple_text: text }];

      return expect(findHaiku(tweets)).resolves.toEqual([]);
    });
  });
});
