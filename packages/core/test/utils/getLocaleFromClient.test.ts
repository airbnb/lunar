import getLocaleFromClient from '../../src/utils/getLocaleFromClient';

describe('getLocaleFromClient()', () => {
  it('returns system locale', () => {
    expect(getLocaleFromClient()).toBe('en');
  });
});
