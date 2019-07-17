import { captureException, withScope } from '@sentry/browser';
import captureError from '../../src/utils/captureError';

jest.mock('@sentry/browser');

describe('captureError()', () => {
  let scope: any;

  beforeEach(() => {
    scope = {
      setContext: jest.fn(),
      setExtras: jest.fn(),
    };

    global.newrelic.noticeError = jest.fn();

    (withScope as jest.Mock).mockImplementation(cb => cb(scope));
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

  it('logs `context` information', () => {
    captureError('Hi', { context: { foo: 'bar' } });

    expect(scope.setContext).toHaveBeenCalledWith('Error', { foo: 'bar' });
  });

  it('logs `extra` information', () => {
    captureError('Hi', { extra: { foo: 'bar' } });

    expect(scope.setExtras).toHaveBeenCalledWith({ foo: 'bar' });
  });
});
