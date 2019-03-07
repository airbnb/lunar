import captureFinished from '../../src/utils/captureFinished';

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

  it('doesnt call if newrelic is not found', () => {
    const old = global.newrelic;

    delete global.newrelic;

    captureFinished();

    expect(spy).not.toHaveBeenCalled();

    global.newrelic = old;
  });
});
