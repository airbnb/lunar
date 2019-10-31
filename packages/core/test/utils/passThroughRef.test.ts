import passThroughRef from '../../src/utils/passThroughRef';

describe('passThroughRef()', () => {
  it('does nothing if empty', () => {
    expect(() => {
      passThroughRef();
    }).not.toThrow();
  });

  it('errors if a string', () => {
    expect(() => {
      // @ts-ignore Allow invalid type
      passThroughRef('foo');
    }).toThrow('String refs are not supported. Use React.createRef() instead.');
  });

  it('calls function with ref', () => {
    const spy = jest.fn();
    const ref = {};

    passThroughRef(spy, ref);

    expect(spy).toHaveBeenCalledWith(ref);
  });

  it('calls function with null when no ref', () => {
    const spy = jest.fn();

    passThroughRef(spy);

    expect(spy).toHaveBeenCalledWith(null);
  });

  it('sets current if an object', () => {
    const handler = { current: null };
    const ref = {};

    passThroughRef(handler, ref);

    expect(handler).toEqual({ current: ref });
  });

  it('sets current as null if an object when no ref', () => {
    const handler = { current: null };

    passThroughRef(handler);

    expect(handler).toEqual({ current: null });
  });
});
