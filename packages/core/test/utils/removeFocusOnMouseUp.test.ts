import removeFocusOnMouseUp from '../../src/utils/removeFocusOnMouseUp';

describe('removeFocusOnMouseUp()', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('triggers blur on target', () => {
    const timeoutSpy = jest.spyOn(window, 'setTimeout');
    const blurSpy = jest.fn();

    removeFocusOnMouseUp({
      // @ts-ignore Allow fake event
      target: { blur: blurSpy },
    });

    expect(timeoutSpy).toHaveBeenCalledTimes(1);

    jest.runOnlyPendingTimers();

    expect(blurSpy).toHaveBeenCalled();

    timeoutSpy.mockRestore();
  });
});
