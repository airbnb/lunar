import { isPrimitive, toString, toBool, toNumber, fromBool } from '../src/helpers';

describe('isPrimitive()', () => {
  it('returns true for string, bool, number', () => {
    expect(isPrimitive('foo')).toBe(true);
    expect(isPrimitive(true)).toBe(true);
    expect(isPrimitive(123)).toBe(true);
  });

  it('returns false otherwise', () => {
    expect(isPrimitive(null)).toBe(false);
    // @ts-ignore Allow invalid type
    expect(isPrimitive({})).toBe(false);
    expect(isPrimitive([])).toBe(false);
  });
});

describe('toString()', () => {
  it('converts primitives to a string', () => {
    expect(toString('foo')).toBe('foo');
    expect(toString(true)).toBe('true');
    expect(toString(123)).toBe('123');
  });

  it('returns an empty string for non-primitives', () => {
    expect(toString(null)).toBe('');
    // @ts-ignore Allow invalid type
    expect(toString({})).toBe('');
    expect(toString([])).toBe('');
  });
});

describe('toBool()', () => {
  it('returns true for truthy words', () => {
    expect(toBool('true')).toBe(true);
    expect(toBool('ON')).toBe(true);
    expect(toBool('1')).toBe(true);
  });

  it('returns false for falsy words', () => {
    expect(toBool('false')).toBe(false);
    expect(toBool('OFF')).toBe(false);
    expect(toBool('0')).toBe(false);
  });

  it('returns false for non-primitives', () => {
    expect(toBool(null)).toBe(false);
    // @ts-ignore Allow invalid type
    expect(toBool({})).toBe(false);
    expect(toBool([])).toBe(false);
  });
});

describe('toNumber()', () => {
  it('returns a number', () => {
    expect(toNumber('123')).toBe(123);
    expect(toNumber(123)).toBe(123);
    expect(toNumber(123.45)).toBe(123.45);
  });

  it('returns 0 for NaN', () => {
    expect(toNumber('false')).toBe(0);
  });

  it('returns 0 for non-primitives', () => {
    expect(toNumber(null)).toBe(0);
    // @ts-ignore Allow invalid type
    expect(toNumber({})).toBe(0);
    expect(toNumber([])).toBe(0);
  });
});

describe('fromBool()', () => {
  describe('when undefined', () => {
    it('returns 1 for checked', () => {
      expect(fromBool(undefined, true)).toBe('1');
    });

    it('returns "" for not checked', () => {
      expect(fromBool(undefined, false)).toBe('');
    });
  });

  describe('when defined', () => {
    it('returns 1 when truthy', () => {
      expect(fromBool(123, true)).toBe('1');
    });

    it('returns "" when falsy', () => {
      expect(fromBool(0, false)).toBe('');
    });
  });
});
