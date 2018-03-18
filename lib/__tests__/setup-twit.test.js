const Twit = require('twit');
const setupTwit = require('../setup-twit');
const apiKeys = require('../../config.json');

describe('setup-twit', () => {
  it('should resolve with a new Twit object', () =>
    expect(setupTwit(apiKeys)).resolves.toBeInstanceOf(Twit));

  it('should reject when apiKeys are missing', () =>
    expect(setupTwit()).rejects.toBeInstanceOf(TypeError));
});
