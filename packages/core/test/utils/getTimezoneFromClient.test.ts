import getTimezoneFromClient from '../../src/utils/getTimezoneFromClient';

describe('getTimezoneFromClient()', () => {
  it('returns system timezone', () => {
    expect(getTimezoneFromClient()).toBe('UTC');
  });
});
