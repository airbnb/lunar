import createRange from '../../src/utils/createRange';

describe('createRange()', () => {
  it('returns an array using start and stop', () => {
    expect(createRange(2, 6)).toEqual(['2', '3', '4', '5', '6']);
  });

  it('supports a stepper', () => {
    expect(createRange(2, 6, 2)).toEqual(['2', '4', '6']);
  });
});
