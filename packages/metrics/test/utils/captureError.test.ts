import Raven from 'raven-js';
import captureError from '../../src/utils/captureError';

jest.mock('raven-js');

describe('captureError()', () => {
  beforeEach(() => {
    global.newrelic.noticeError = jest.fn();
  });

  it('does nothing if no error', () => {
    captureError(null);

    expect(Raven.captureException).not.toHaveBeenCalled();
    expect(global.newrelic.noticeError).not.toHaveBeenCalled();
  });

  it('works with an Error', () => {
    const error = new Error('Hi');

    captureError(error);

    expect(Raven.captureException).toHaveBeenCalledWith(error, {});
    expect(global.newrelic.noticeError).toHaveBeenCalledWith(error);
  });

  it('works with an Event', () => {
    const event = new Event('click');

    captureError(event);

    const error = new Error(`Captured an event: ${String(event)}`);

    expect(Raven.captureException).toHaveBeenCalledWith(error, {});
    expect(global.newrelic.noticeError).toHaveBeenCalledWith(error);
  });

  it('works with an error message', () => {
    captureError('Hi');

    expect(Raven.captureException).toHaveBeenCalledWith(new Error('Hi'), {});
    expect(global.newrelic.noticeError).toHaveBeenCalledWith(new Error('Hi'));
  });
});
