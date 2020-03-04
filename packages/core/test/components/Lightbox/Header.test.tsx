import React from 'react';
import { mountUseStyles } from '@airbnb/lunar-test-utils';
import Button from '../../../src/components/Button';
import IconButton from '../../../src/components/IconButton';
import Pagination from '../../../src/components/Pagination';
import LightboxHeader from '../../../src/components/Lightbox/Header';
import { RotateControls, ZoomControls } from '../../../src/components/ImageViewer';
import { ARROW_RIGHT, ARROW_LEFT } from '../../../src/keys';

describe('<LightboxHeader />', () => {
  const onChangeSlideSpy = jest.fn();
  const onToggleAsideSpy = jest.fn();
  const props = {
    activeIndex: 0,
    imageCount: 5,
    onChangeSlide: onChangeSlideSpy,
    onToggleAside: onToggleAsideSpy,
  };

  it('renders a Pagination component', () => {
    const wrapper = mountUseStyles(<LightboxHeader {...props} />);

    expect(wrapper.find(Pagination)).toHaveLength(1);
  });

  describe('renders a toggle info Button', () => {
    it('with "Hide Info" if hideAside is false', () => {
      const wrapper = mountUseStyles(<LightboxHeader {...props} hasAside />);

      expect(
        wrapper
          .find(Button)
          .at(0)
          .prop('children'),
      ).toBe('Hide info');
    });

    it('with "Show Info" if hideAside is true', () => {
      const wrapper = mountUseStyles(<LightboxHeader {...props} hasAside hideAside />);

      expect(
        wrapper
          .find(Button)
          .at(0)
          .prop('children'),
      ).toBe('Show info');
    });
  });

  describe('handles keydown events', () => {
    const spy = jest.fn();

    beforeEach(() => {
      spy.mockReset();
    });

    it('changes slide to next on right arrow', () => {
      mountUseStyles(<LightboxHeader {...props} onChangeSlide={spy} />);
      const event = new KeyboardEvent('keydown', {
        key: ARROW_RIGHT,
      });
      window.dispatchEvent(event);

      expect(spy).toHaveBeenCalledWith(1);
    });

    it('changes slide to previous on left arrow', () => {
      const wrapper = mountUseStyles(<LightboxHeader {...props} onChangeSlide={spy} />);
      wrapper.setProps({ activeIndex: 1, imageCount: 2 });
      const event = new KeyboardEvent('keydown', {
        key: ARROW_LEFT,
      });
      window.dispatchEvent(event);

      expect(spy).toHaveBeenCalledWith(0);
    });

    it('changes slide to first on shift + left arrow', () => {
      const wrapper = mountUseStyles(<LightboxHeader {...props} onChangeSlide={spy} />);
      wrapper.setProps({ activeIndex: 2, imageCount: 3 });
      const event = new KeyboardEvent('keydown', {
        key: ARROW_LEFT,
        shiftKey: true,
      });
      window.dispatchEvent(event);

      expect(spy).toHaveBeenCalledWith(0);
    });

    it('changes slide to first on shift + right arrow', () => {
      const wrapper = mountUseStyles(<LightboxHeader {...props} onChangeSlide={spy} />);
      wrapper.setProps({ activeIndex: 0, imageCount: 3 });
      const event = new KeyboardEvent('keydown', {
        key: ARROW_RIGHT,
        shiftKey: true,
      });
      window.dispatchEvent(event);

      expect(spy).toHaveBeenCalledWith(2);
    });
  });

  describe('componentWillUnmount()', () => {
    it('removes event listener for keydown on umount', () => {
      const eventSpy = jest.spyOn(window, 'removeEventListener');
      const wrapper = mountUseStyles(<LightboxHeader {...props} />);

      wrapper.unmount();

      expect(eventSpy).toHaveBeenCalled();
    });
  });

  describe('rotate controls', () => {
    const spy = jest.fn();

    it('renders rotate controls', () => {
      const wrapper = mountUseStyles(
        <LightboxHeader {...props} showRotateControls onRotateImage={spy} />,
      );

      expect(wrapper.find(RotateControls)).toHaveLength(1);
    });

    it('calls onRotateImage', () => {
      const wrapperMount = mountUseStyles(
        <LightboxHeader {...props} showRotateControls onRotateImage={spy} />,
      );
      wrapperMount
        .find(RotateControls)
        .find(IconButton)
        .at(1)
        .simulate('click');

      expect(spy).toHaveBeenCalledWith(90);
    });
  });

  describe('zoom controls', () => {
    const spy = jest.fn();

    it('renders zoom controls', () => {
      const wrapper = mountUseStyles(
        <LightboxHeader {...props} showZoomControls onZoomImage={spy} />,
      );

      expect(wrapper.find(ZoomControls)).toHaveLength(1);
    });

    it('calls onZoomImage', () => {
      const wrapperMount = mountUseStyles(
        <LightboxHeader {...props} showZoomControls onZoomImage={spy} />,
      );
      wrapperMount
        .find(ZoomControls)
        .find(IconButton)
        .at(1)
        .simulate('click');

      expect(spy).toHaveBeenCalledWith(1.5);
    });
  });
});
