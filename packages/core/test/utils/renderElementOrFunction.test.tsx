import React from 'react';
import renderElementOrFunction from '../../src/utils/renderElementOrFunction';

describe('renderElementOrFunction()', () => {
  it('returns null when null is passed', () => {
    expect(renderElementOrFunction(null)).toBeNull();
  });

  it('returns null when undefined is passed', () => {
    expect(renderElementOrFunction(undefined)).toBeNull();
  });

  it('returns null for other types', () => {
    // @ts-ignore Allow invalid type
    expect(renderElementOrFunction(123)).toBeNull();
    // @ts-ignore Allow invalid type
    expect(renderElementOrFunction('foo')).toBeNull();
    // @ts-ignore Allow invalid type
    expect(renderElementOrFunction([])).toBeNull();
  });

  it('returns the React element as is', () => {
    const element = <div />;

    expect(renderElementOrFunction(element)).toBe(element);
  });

  it('returns the React element from a function', () => {
    const element = <div />;

    expect(renderElementOrFunction(() => element)).toBe(element);
  });

  it('returns null from a function', () => {
    expect(renderElementOrFunction(() => null)).toBeNull();
  });

  it('returns null when an invalid value is returned from a function', () => {
    // @ts-ignore Allow invalid type
    expect(renderElementOrFunction(() => 123)).toBeNull();
  });

  it('passes a value to the function', () => {
    expect(renderElementOrFunction((name: string) => <input name={name} />, 'input')).toEqual(
      <input name="input" />,
    );
  });
});
