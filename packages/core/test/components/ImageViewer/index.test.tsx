import React from 'react';
import { shallowWithStyles } from '@airbnb/lunar-test-utils';
import ImageViewer, { Position } from '../../../src/components/ImageViewer';
import ResponsiveImage from '../../../src/components/ResponsiveImage';

describe('<ImageViewer />', () => {
  const spy = jest.fn();
  const props = {
    alt: 'alt',
    src: 'img.jpg',
  };
  const mouseEvent = {
    pageX: 10,
    pageY: 10,
    preventDefault: spy,
  };

  it('renders an img', () => {
    const wrapper = shallowWithStyles(<ImageViewer {...props} />);

    expect(wrapper.find(ResponsiveImage)).toHaveLength(1);
  });

  it('renders borderless', () => {
    const wrapper = shallowWithStyles(<ImageViewer borderless {...props} />);

    expect(wrapper.prop('className')).toMatch('container_borderless');
  });

  describe('componentWillUnmount()', () => {
    it('removes event listener for mousemove on umount', () => {
      const eventSpy = jest.spyOn(document, 'removeEventListener');

      const wrapper = shallowWithStyles(<ImageViewer {...props} />);
      // @ts-ignore
      wrapper.instance().componentWillUnmount();

      expect(eventSpy).toHaveBeenCalled();
    });
  });

  describe('handleMouseDown()', () => {
    it('sets the dragging and lastMouseLocation state', () => {
      const wrapper = shallowWithStyles(<ImageViewer {...props} />);
      wrapper.simulate('mousedown', mouseEvent);

      expect(wrapper.state('dragging')).toBe(true);
      expect(wrapper.state('lastMouseLocation')).toMatchObject({ x: 10, y: 10 });
    });
  });

  describe('handleMouseUp()', () => {
    it('resets the dragging and lastMouseLocation state', () => {
      const wrapper = shallowWithStyles(<ImageViewer {...props} />);
      wrapper.simulate('mouseup', mouseEvent);

      expect(wrapper.state('dragging')).toBe(false);
      expect(wrapper.state('lastMouseLocation')).toMatchObject({ x: 0, y: 0 });
    });
  });

  describe('handleMouseMove()', () => {
    it('does not set state if not dragging', () => {
      const wrapper = shallowWithStyles(<ImageViewer {...props} />);
      const lastMouseLocation: Position = wrapper.state('lastMouseLocation');
      wrapper.simulate('mousemove', mouseEvent);

      expect(wrapper.state('dragging')).toBe(false);
      expect(wrapper.state('lastMouseLocation')).toStrictEqual(lastMouseLocation);
    });

    it('sets state if dragging', () => {
      const eventMap: {
        mousemove: null | ((event: Partial<MouseEvent>) => void);
      } = {
        mousemove: null,
      };

      jest.spyOn(document, 'addEventListener').mockImplementation((event, cb) => {
        eventMap[event as 'mousemove'] = cb as () => void;
      });

      const wrapper = shallowWithStyles(<ImageViewer {...props} />);
      wrapper.simulate('mousedown', mouseEvent);

      eventMap.mousemove!({ ...mouseEvent, pageX: 20, pageY: 20 });

      expect(wrapper.state('lastMouseLocation')).toMatchObject({ x: 20, y: 20 });
      expect(wrapper.state('imageLocation')).toMatchObject({ x: 10, y: 10 });
    });
  });
});
