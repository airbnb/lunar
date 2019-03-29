/* eslint-disable unicorn/no-zero-fractions */

import formatPrice from '../../src/utils/formatPrice';

describe('formatPrice()', () => {
  it('format the price', () => {
    expect(formatPrice(5802, 'USD')).toBe('$5,802.00');
    expect(formatPrice(89243, 'JPY')).toBe('¥89,243');
  });

  it('allows the currency to be optional', () => {
    expect(formatPrice(5802)).toBe('5,802');
    expect(formatPrice(89243)).toBe('89,243');
  });

  it('handles decimal places correctly', () => {
    expect(formatPrice(24334)).toBe('24,334');
    expect(formatPrice(23.12)).toBe('23.12');
    expect(formatPrice(435.2445)).toBe('435.245');
    expect(formatPrice(748235.8349374)).toBe('748,235.835');

    expect(formatPrice(24334, 'USD')).toBe('$24,334.00');
    expect(formatPrice(23.12, 'USD')).toBe('$23.12');
    expect(formatPrice(435.2445, 'JPY')).toBe('¥435');
    expect(formatPrice(748235.8349374, 'JPY')).toBe('¥748,236');
  });

  it('round or add decimals', () => {
    expect(formatPrice(123, 'USD')).toBe('$123.00');
    expect(formatPrice(123.45, 'USD')).toBe('$123.45');
    expect(formatPrice(123.65, 'USD', { round: true })).toBe('$124.00');
  });

  it('handles precision', () => {
    expect(formatPrice(123.48937239, '', { precision: 1 })).toBe('123.5');
    expect(formatPrice(123.48937239, '', { precision: 2 })).toBe('123.49');
    expect(formatPrice(123.48937239, '', { precision: 3 })).toBe('123.489');
  });

  it('wraps in parenthesis if negative', () => {
    expect(formatPrice(-5802)).toBe('(5,802)');
    expect(formatPrice(-5802, 'USD')).toBe('($5,802.00)');
  });

  it('handles trailing zeroes', () => {
    expect(formatPrice(123, 'USD', { trimTrailingZeros: true })).toBe('$123');
    expect(formatPrice(123.0, 'USD', { trimTrailingZeros: true })).toBe('$123');
    expect(formatPrice(123.1, 'USD')).toBe('$123.10');
    expect(formatPrice(123.01, 'USD')).toBe('$123.01');

    expect(formatPrice(123, 'USD', { round: true, trimTrailingZeros: true })).toBe('$123');
    expect(formatPrice(123.1, 'USD', { round: true, trimTrailingZeros: true })).toBe('$123');
    expect(formatPrice(123.01, 'USD', { round: true, trimTrailingZeros: true })).toBe('$123');
  });
});
