import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme from 'enzyme';
import { mountWithStyles, shallowWithStyles } from '@airbnb/lunar-test-utils';
import Overlay, {
  Props as OverlayProps,
  State as OverlayState,
} from '../../src/components/Overlay';
import Portal, {
  Portal as BasePortal,
  Props as PortalProps,
  State as PortalState,
} from '../../src/components/Overlay/Portal';
import { ESCAPE } from '../../src/keys';

jest.mock('lodash/throttle', () => (value: any) => value);
jest.mock('lodash/debounce', () => (value: any) => value);

describe('<Overlay />', () => {
  const props = {
    onClose() {},
  };

  it('makes a portal', () => {
    const portalSpy = jest.spyOn(ReactDOM, 'createPortal');
    const eventSpy = jest.spyOn(window, 'addEventListener');
    const closeSpy = jest.fn();
    const wrapper = mountWithStyles(<Overlay onClose={closeSpy}>hello world</Overlay>);

    expect(portalSpy).toHaveBeenCalledWith(null, expect.anything());

    wrapper.setProps({ open: true });

    expect(portalSpy).toHaveBeenCalledWith(expect.anything(), expect.anything());
    expect(eventSpy).toHaveBeenCalledWith('keydown', expect.any(Function));
    expect(closeSpy).not.toHaveBeenCalled();

    wrapper
      .find(Portal)
      .find('div[role="presentation"]')
      .simulate('click');

    expect(closeSpy).toHaveBeenCalled();

    wrapper.unmount();
    portalSpy.mockRestore();
    eventSpy.mockRestore();
  });

  it('forces an update on resize', () => {
    const wrapper = mountWithStyles<Overlay>(
      <Overlay {...props} open>
        hello world
      </Overlay>,
    );
    const spy = jest.spyOn(wrapper.instance(), 'forceUpdate');

    wrapper.find(Portal).prop('onResize')();

    expect(spy).toHaveBeenCalled();
  });

  it('does not calls addScrollListeners', () => {
    const wrapper = mountWithStyles<Overlay>(<Overlay {...props}>hello world</Overlay>);
    // @ts-ignore Method not being found on class
    const spy = jest.spyOn(wrapper.instance(), 'addScrollListeners');

    expect(spy).not.toHaveBeenCalled();

    wrapper.setProps({ open: true });

    expect(spy).not.toHaveBeenCalled();
  });

  describe('noBackground', () => {
    let wrapper: Enzyme.ReactWrapper<OverlayProps, OverlayState, Overlay>;

    beforeEach(() => {
      wrapper = mountWithStyles(
        <Overlay {...props} noBackground>
          hello world
        </Overlay>,
      );
    });

    it('calls addScrollListeners when open', () => {
      // @ts-ignore Method not being found on class
      const spy = jest.spyOn(wrapper.instance(), 'addScrollListeners');

      expect(spy).not.toHaveBeenCalled();

      wrapper.setProps({ open: true });

      expect(spy).toHaveBeenCalled();
    });

    it('handleScroll closes the overlay', () => {
      const spy = jest.fn();

      wrapper.setProps({ open: true, onClose: spy });

      expect(spy).not.toHaveBeenCalled();

      // @ts-ignore Allow private access
      (wrapper.instance() as Overlay).handleScroll();

      expect(spy).toHaveBeenCalled();
    });
  });

  describe('<Portal /> handler functions', () => {
    let wrapper: Enzyme.ShallowWrapper<PortalProps, PortalState, BasePortal>;
    let instance: BasePortal;
    let closeSpy: jest.Mock;
    let resizeSpy: jest.Mock;

    beforeEach(() => {
      closeSpy = jest.fn();
      resizeSpy = jest.fn();

      wrapper = shallowWithStyles(
        <Portal {...props} onResize={resizeSpy} onClose={closeSpy} noBackground />,
      ) as any;
      instance = wrapper.instance();
    });

    describe('handleClick()', () => {
      it('calls `onClose` if target matches ref', () => {
        const target = document.createElement('div');

        instance.ref = { current: target };

        wrapper
          .find('div')
          .at(0)
          .simulate('click', { target });

        wrapper
          .find('div')
          .at(0)
          .simulate('click', { target: document.createElement('button') });

        expect(closeSpy).toHaveBeenCalledTimes(1);
      });
    });

    describe('handleKeyDown()', () => {
      it('default', () => {
        window.dispatchEvent(new KeyboardEvent('keydown'));

        expect(closeSpy).not.toHaveBeenCalled();
        expect(wrapper.state()).toMatchSnapshot();
      });

      it('ESCAPE', () => {
        const event = new KeyboardEvent('keydown', {
          key: ESCAPE,
        });

        window.dispatchEvent(event);

        expect(closeSpy).toHaveBeenCalled();
      });
    });

    describe('handleResize()', () => {
      it('calls `onResize`', () => {
        window.dispatchEvent(new Event('resize'));

        expect(resizeSpy).toHaveBeenCalled();
      });
    });

    describe('handleScroll()', () => {
      it('sets height using ref', () => {
        const ref = document.createElement('div');

        Object.defineProperty(ref, 'scrollHeight', { value: 1000 });

        wrapper.setProps({
          noBackground: false,
        });

        instance.ref = { current: ref };

        wrapper
          .find('div')
          .at(0)
          .simulate('scroll');

        expect(closeSpy).not.toHaveBeenCalled();
        expect(wrapper.state('height')).toBe(1000);
      });
    });
  });
});
