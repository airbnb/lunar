import componentName from '../../src/prop-types/componentName';

describe('componentName()', () => {
  it('doesnt error for proper name', () => {
    expect(componentName({ name: 'FooBar' }, 'name', 'Foo', '', '')).toBeNull();
  });

  it('doesnt error for empty data', () => {
    expect(componentName({ name: '' }, 'name', 'Foo', '', '')).toBeNull();
    expect(componentName({ name: false }, 'name', 'Foo', '', '')).toBeNull();
    expect(componentName({ name: null }, 'name', 'Foo', '', '')).toBeNull();
  });

  it('errors for non-string', () => {
    expect(componentName({ name: 123 }, 'name', 'Foo', '', '')).not.toBeNull();
    expect(componentName({ name: {} }, 'name', 'Foo', '', '')).not.toBeNull();
    expect(componentName({ name: [] }, 'name', 'Foo', '', '')).not.toBeNull();
  });

  it('errors for invalid name', () => {
    expect(componentName({ name: 'fooBar' }, 'name', 'Foo', '', '')).not.toBeNull();
    expect(componentName({ name: 'Foo_Bar' }, 'name', 'Foo', '', '')).not.toBeNull();
    expect(componentName({ name: 'Foo-Bar' }, 'name', 'Foo', '', '')).not.toBeNull();
  });

  describe('isRequired', () => {
    it('errors for empty data', () => {
      expect(componentName.isRequired({ name: '' }, 'name', 'Foo', '', '')).not.toBeNull();
      expect(componentName.isRequired({ name: false }, 'name', 'Foo', '', '')).not.toBeNull();
      expect(componentName.isRequired({ name: null }, 'name', 'Foo', '', '')).not.toBeNull();
    });

    it('passes to parent function', () => {
      expect(componentName.isRequired({ name: 'FooBar' }, 'name', 'Foo', '', '')).toBeNull();
    });
  });
});
