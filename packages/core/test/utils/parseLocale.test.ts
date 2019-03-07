import parseLocale from '../../src/utils/parseLocale';

describe('parseLocale()', () => {
  it('returns the locale if supported', () => {
    expect(parseLocale('fr')).toBe('fr');
  });

  it('returns undefined if empty', () => {
    expect(parseLocale()).toBeUndefined();
  });

  it('returns the default locale if not supported', () => {
    expect(parseLocale('xx')).toBeUndefined();
  });

  it('strips territory', () => {
    expect(parseLocale('zh-CN')).toBe('zh');
  });

  it('strips territory using underscors', () => {
    expect(parseLocale('zh_CN')).toBe('zh');
  });

  it('supports uppercase locale', () => {
    expect(parseLocale('ES')).toBe('es');
  });
});
