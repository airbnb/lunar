import Enzyme, { mount, shallow } from 'enzyme';
import React from 'react';
import ReactDOM from 'react-dom';
import { mockContextConsumer, unwrapHOCs } from '@airbnb/lunar-test-utils';
import Row from '../../src/components/Row';
import Sheet from '../../src/components/Sheet';
import SheetContext from '../../src/components/Sheet/SheetContext';
import { ESCAPE } from '../../src/keys';

describe('<Sheet />', () => {
  let contextSpy: jest.Mock;
  let unmockConsumer: () => void;

  function unwrap(element: any): Enzyme.ShallowWrapper {
    return unwrapHOCs(shallow(element), 'BaseSheet', contextSpy, { render: true });
  }

  beforeEach(() => {
    contextSpy = jest.fn();
    unmockConsumer = mockContextConsumer(SheetContext, contextSpy);
  });

  afterEach(() => {
    unmockConsumer();
  });

  it('invokes the context method', () => {
    const wrapper = unwrap(
      <Sheet onClose={jest.fn()} visible>
        sheet content
      </Sheet>,
    );

    expect(contextSpy).toHaveBeenCalledWith(true);

    wrapper.setProps({ visible: false });
    wrapper.update();
    // Simulate the end of the animation:
    wrapper.simulate('animationEnd', { target: null });

    expect(contextSpy).toHaveBeenCalledWith(false);
  });

  it('calls onClose when the close button is pressed', () => {
    const close = jest.fn();
    const wrapper = unwrap(
      <Sheet onClose={close} visible>
        sheet content
      </Sheet>,
    );

    shallow(wrapper.find(Row).prop('before') as React.ReactElement).simulate('click');

    expect(close).toHaveBeenCalled();
  });

  describe('gap', () => {
    it('calls onClose when the gap button is pressed', () => {
      const close = jest.fn();
      const wrapper = unwrap(
        <Sheet onClose={close} gap visible>
          sheet content
        </Sheet>,
      );

      wrapper.find('button[aria-label="Close"]').simulate('click');

      expect(close).toHaveBeenCalled();
    });
  });

  describe('portal', () => {
    it('sets up document', () => {
      const portalSpy = jest.spyOn(ReactDOM, 'createPortal');
      const eventSpy = jest.spyOn(document, 'addEventListener');

      unwrap(
        <Sheet onClose={jest.fn()} visible portal>
          sheet content
        </Sheet>,
      ).shallow();

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
      );

      jest.runAllTimers();
      jest.useRealTimers();

      expect(wrapper.getDOMNode().contains(document.activeElement)).toBe(true);

      wrapper.setProps({ visible: false });

      expect(document.activeElement).toBe(focused);
    });

    it('closes the sheet when escape is pressed', () => {
      const close = jest.fn();

      mount(
        <Sheet onClose={close} visible portal>
          sheet content
        </Sheet>,
      );

      // Dispatch a keydown event for the escape button:
      const event = new KeyboardEvent('keydown', { key: ESCAPE });
      document.dispatchEvent(event);

      expect(close).toHaveBeenCalled();
    });
  });
});
