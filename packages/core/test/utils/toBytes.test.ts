import toBytes from '../../src/utils/toBytes';

describe('toBytes()', () => {
  it('supports B', () => {
    expect(toBytes(15)).toBe('15 B');
  });

  it('converts KB', () => {
    expect(toBytes(1937)).toBe('1.89 KB');
  });

  it('converts MB', () => {
    expect(toBytes(2248937)).toBe('2.14 MB');
  });

  it('converts GB', () => {
    expect(toBytes(1196248937)).toBe('1.11 GB');
  });
});
