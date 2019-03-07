import removeFocusOnMouseUp from '../../src/utils/removeFocusOnMouseUp';

jest.useFakeTimers();

describe('removeFocusOnMouseUp()', () => {
  it('triggers blur on target', () => {
    const spy = jest.fn();

    removeFocusOnMouseUp({
      // @ts-ignore Allow fake event
      target: { blur: spy },
    });

    expect(setTimeout).toHaveBeenCalledTimes(1);

    jest.runOnlyPendingTimers();
    expect(spy).toHaveBeenCalled();
  });
});
