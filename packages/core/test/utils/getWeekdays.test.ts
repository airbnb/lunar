import getWeekdays from '../../src/utils/getWeekdays';

describe('getWeekdays()', () => {
  it('returns a list', () => {
    expect(getWeekdays('short')).toEqual(['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']);
  });

  it('returns a list with sunday first', () => {
    expect(getWeekdays('long', true)).toEqual([
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ]);
  });
});
