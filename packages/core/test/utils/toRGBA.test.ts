import toRGBA from '../../src/utils/toRGBA';

describe('toRGBA()', () => {
  it('converts a 3 letter hexcode', () => {
    expect(toRGBA('#eee', 15)).toBe('rgba(238, 238, 238, 0.15)');
  });

  it('converts a 6 letter hexcode', () => {
    expect(toRGBA('A5D49F', 50)).toBe('rgba(165, 212, 159, 0.5)');
  });
});
