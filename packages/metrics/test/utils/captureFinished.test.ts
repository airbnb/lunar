import { captureEvent } from '@sentry/browser';
import captureFinished from '../../src/utils/captureFinished';
import '../setup';

jest.mock('@sentry/browser');

describe('captureFinished()', () => {
  let spy: jest.Mock;

  beforeEach(() => {
    spy = jest.fn();
    global.newrelic.finished = spy;
  });

  it('passes to newrelic', () => {
    captureFinished();

    expect(spy).toHaveBeenCalled();
  });

  it('passes to sentry', () => {
    captureFinished({ tags: { foo: 'bar' } });

    expect(captureEvent).toHaveBeenCalledWith(
      expect.objectContaining({
        event_id: 'finished',
        tags: { foo: 'bar' },
      }),
    );
  });

  it('doesnt call if newrelic is not found', () => {
    const old = global.newrelic;

    delete global.newrelic;

    captureFinished();

    expect(spy).not.toHaveBeenCalled();

    global.newrelic = old;
  });
});
