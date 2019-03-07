import getMemberName from '../../src/utils/getMemberName';

describe('getMemberName()', () => {
  it('returns unknown if no names', () => {
    expect(getMemberName({})).toBe('Unknown member');
  });

  it('can change unknown copy', () => {
    expect(getMemberName({}, false, 'Unknown user')).toBe('Unknown user');
  });

  it('returns the first name of no last name', () => {
    expect(
      getMemberName({
        first_name: 'Bruce',
      }),
    ).toBe('Bruce');
  });

  it('returns the first name and last name', () => {
    expect(
      getMemberName({
        first_name: 'Bruce',
        last_name: 'Wayne',
      }),
    ).toBe('Bruce Wayne');
  });

  it('returns the last name shortened', () => {
    expect(
      getMemberName(
        {
          first_name: 'Bruce',
          last_name: 'Wayne',
        },
        true,
      ),
    ).toBe('Bruce W.');
  });
});
