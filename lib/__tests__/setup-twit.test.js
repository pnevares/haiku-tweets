const Twit = require('twit');
const setupTwit = require('../setup-twit');
const config = require('../../config.json');

describe('setup-twit', () => {
  it('should resolve with a new Twit object', () =>
    expect(setupTwit(config.twitter)).resolves.toBeInstanceOf(Twit));

  it('should reject when apiKeys are missing', () =>
    expect(setupTwit()).rejects.toBeInstanceOf(TypeError));
});
