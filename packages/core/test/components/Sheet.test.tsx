import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import IconButton from '../../src/components/IconButton';
import Sheet, { BaseSheet } from '../../src/components/Sheet';
import SheetContext from '../../src/components/Sheet/SheetContext';
import DirectionProvider from '../../src/providers/DirectionProvider';
import ThemeProvider from '../../src/providers/ThemeProvider';
import { ESCAPE } from '../../src/keys';

describe('<Sheet />', () => {
  let contextSpy: jest.Mock;

  function WrappingComponent({ children }: { children: NonNullable<React.ReactNode> }) {
    return (
      <SheetContext.Provider value={contextSpy}>
        <DirectionProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </DirectionProvider>
      </SheetContext.Provider>
    );
  }

  beforeEach(() => {
    contextSpy = jest.fn();
  });

  it('invokes the context method', () => {
    const wrapper = mount(
      <Sheet onClose={jest.fn()} visible>
        sheet content
      </Sheet>,
      {
        // @ts-ignore Not typed yet
        wrappingComponent: WrappingComponent,
      },
    );

    expect(contextSpy).toHaveBeenCalledWith(true);

    wrapper.setProps({ visible: false });
    wrapper.update();
    // Simulate the end of the animation:
    wrapper.simulate('animationEnd', { target: wrapper.find(BaseSheet).getDOMNode() });

    expect(contextSpy).toHaveBeenCalledWith(false);
  });

  it('calls onClose when the close button is pressed', () => {
    const close = jest.fn();
    const wrapper = mount(
      <Sheet onClose={close} visible>
        sheet content
      </Sheet>,
      {
        // @ts-ignore Not typed yet
        wrappingComponent: WrappingComponent,
      },
    );

    wrapper.find(IconButton).simulate('click');

    expect(close).toHaveBeenCalled();
  });

  describe('gap', () => {
    it('calls onClose when the gap button is pressed', () => {
      const close = jest.fn();
      const wrapper = mount(
        <Sheet onClose={close} gap visible>
          sheet content
        </Sheet>,
        {
          // @ts-ignore Not typed yet
          wrappingComponent: WrappingComponent,
        },
      );

      wrapper.find('button[aria-label="Close"]').simulate('click');

      expect(close).toHaveBeenCalled();
    });
  });

  describe('portal', () => {
    it('sets up document', () => {
      const portalSpy = jest.spyOn(ReactDOM, 'createPortal');
      const eventSpy = jest.spyOn(document, 'addEventListener');

      mount(
        <Sheet onClose={jest.fn()} visible portal>
          sheet content
        </Sheet>,
        {
          // @ts-ignore Not typed yet
          wrappingComponent: WrappingComponent,
        },
      );

      expect(portalSpy).toHaveBeenCalled();
      expect(eventSpy).toHaveBeenCalledWith('keydown', expect.any(Function));

      portalSpy.mockRestore();
      eventSpy.mockRestore();
    });

    it('focuses the first element and restores focus on close', () => {
      const focused = document.createElement('input');
      document.body.appendChild(focused);
      focused.focus();

      jest.useFakeTimers();

      const wrapper = mount(
        <Sheet onClose={jest.fn()} visible portal>
          sheet content
        </Sheet>,
        {
          // @ts-ignore Not typed yet
          wrappingComponent: WrappingComponent,
        },
      );

      jest.runAllTimers();
      jest.useRealTimers();

      expect(
        wrapper
          .find(BaseSheet)
          .getDOMNode()
          .contains(document.activeElement),
      ).toBe(true);

      wrapper.setProps({ visible: false });

      expect(document.activeElement).toBe(focused);
    });

    it('closes the sheet when escape is pressed', () => {
      const close = jest.fn();

      mount(
        <Sheet onClose={close} visible portal>
          sheet content
        </Sheet>,
        {
          // @ts-ignore Not typed yet
          wrappingComponent: WrappingComponent,
        },
      );

      // Dispatch a keydown event for the escape button:
      const event = new KeyboardEvent('keydown', { key: ESCAPE });
      document.dispatchEvent(event);

      expect(close).toHaveBeenCalled();
    });
  });
});
