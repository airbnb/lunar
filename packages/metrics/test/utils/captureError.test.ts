import { captureException, withScope } from '@sentry/browser';
import { Scope } from '@sentry/types';
import captureError from '../../src/utils/captureError';
import '../setup';

jest.mock('@sentry/browser');

describe('captureError()', () => {
  let scope: Scope;

  beforeEach(() => {
    // @ts-ignore
    scope = {
      setContext: jest.fn(),
      setExtras: jest.fn(),
      setFingerprint: jest.fn(),
      setTags: jest.fn(),
    };

    // eslint-disable-next-line jest/prefer-spy-on
    global.newrelic.noticeError = jest.fn();

    (withScope as jest.Mock).mockImplementation((cb) => cb(scope));
  });

  it('does nothing if no error', () => {
    captureError(null);

    expect(captureException).not.toHaveBeenCalled();
    expect(global.newrelic.noticeError).not.toHaveBeenCalled();
  });

  it('works with an Error', () => {
    const error = new Error('Hi');

    captureError(error);

    expect(captureException).toHaveBeenCalledWith(error);
    expect(global.newrelic.noticeError).toHaveBeenCalledWith(error);
  });

  it('works with an Event', () => {
    const event = new Event('click');

    captureError(event);

    const error = new Error(`Captured an event: ${String(event)}`);

    expect(captureException).toHaveBeenCalledWith(error);
    expect(global.newrelic.noticeError).toHaveBeenCalledWith(error);
  });

  it('works with an error message', () => {
    captureError('Hi');

    expect(captureException).toHaveBeenCalledWith(new Error('Hi'));
    expect(global.newrelic.noticeError).toHaveBeenCalledWith(new Error('Hi'));
  });

  it('logs `contexts` information', () => {
    captureError('Hi', { contexts: { name: { foo: 'bar' } } });

    expect(scope.setContext).toHaveBeenCalledWith('name', { foo: 'bar' });
  });

  it('logs `extra` information', () => {
    captureError('Hi', { extra: { foo: 'bar' } });

    expect(scope.setExtras).toHaveBeenCalledWith({ foo: 'bar' });
  });

  it('logs `fingerprint` information', () => {
    captureError('Hi', { fingerprint: ['foo'] });

    expect(scope.setFingerprint).toHaveBeenCalledWith(['foo']);
  });

  it('logs `tags` information', () => {
    captureError('Hi', { tags: { foo: 'bar' } });

    expect(scope.setTags).toHaveBeenCalledWith({ foo: 'bar' });
  });
});
