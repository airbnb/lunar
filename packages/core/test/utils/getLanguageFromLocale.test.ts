import getLanguageFromLocale from '../../src/utils/getLanguageFromLocale';

describe('getLanguageFromLocale()', () => {
  it('returns the language', () => {
    expect(getLanguageFromLocale('en')).toBe('English');
    expect(getLanguageFromLocale('ko')).toBe('Korean');
  });
});
