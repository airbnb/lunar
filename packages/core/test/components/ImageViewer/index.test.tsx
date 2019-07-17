import React from 'react';
import { shallowWithStyles } from '@airbnb/lunar-test-utils';
import ImageViewer from '../../../src/components/ImageViewer';

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

    expect(wrapper.find('img')).toHaveLength(1);
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
    it('does not change the state if not dragging', () => {
      const wrapper = shallowWithStyles(<ImageViewer {...props} />);
      wrapper.simulate('mousemove', mouseEvent);

      expect(wrapper.state('dragging')).toBe(false);
      expect(wrapper.state('lastMouseLocation')).toMatchObject({ x: 0, y: 0 });
    });

    it('sets state if dragging', () => {
      const eventMap = {
        mousedown: null,
      } as any;

      document.addEventListener = jest.fn((event, cb) => {
        eventMap[event] = cb;
      });

      const wrapper = shallowWithStyles(<ImageViewer {...props} />);
      wrapper.simulate('mousedown', mouseEvent);
      eventMap.mousemove({ ...mouseEvent, pageX: 20, pageY: 20 });

      expect(wrapper.state('lastMouseLocation')).toMatchObject({ x: 20, y: 20 });
      expect(wrapper.state('imageLocation')).toMatchObject({ x: 10, y: 10 });
    });
  });
});
