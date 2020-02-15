import { wrapEnv } from '@airbnb/lunar-test-utils';
import deprecate from '../../src/utils/deprecate';

describe('deprecate', () => {
  let spy: jest.SpyInstance;

  beforeEach(() => {
    spy = jest.spyOn(console, 'warn');
    spy.mockImplementation(() => jest.fn());
  });

  afterEach(() => {
    spy.mockRestore();
  });

  it('logs a warning', () => {
    const wrappedFn = deprecate(jest.fn());
    wrappedFn();
    expect(spy).toHaveBeenCalled();
  });

  it('logs a custom warning', () => {
    const message = 'foobar';
    const wrappedFn = deprecate(jest.fn(), message);
    wrappedFn();
    expect(spy).toHaveBeenCalledWith(message);
  });

  it('calls the underlying function', () => {
    const fn = jest.fn();
    const wrappedFn = deprecate(fn);
    const args = ['one', 'two', 'three'];
    wrappedFn(...args);
    expect(fn).toHaveBeenCalledWith(...args);
  });

  it(
    'doesnt log in production',
    wrapEnv('production', () => {
      const wrappedFn = deprecate(jest.fn());
      wrappedFn();
      expect(spy).not.toHaveBeenCalled();
    }),
  );
});
