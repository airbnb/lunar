import React from 'react';
import { shallowWithStyles } from '@airbnb/lunar-test-utils';
import IconButton from '../../../src/components/IconButton';
import Menu, { Item } from '../../../src/components/Menu';
import ZoomControls from '../../../src/components/ImageViewer/ZoomControls';

describe('<ZoomControls />', () => {
  const setScaleSpy = jest.fn();
  const props = {
    onSetScale: setScaleSpy,
    scale: 1,
  };

  describe('zoom buttons', () => {
    it('renders two IconButtons', () => {
      const wrapper = shallowWithStyles(<ZoomControls {...props} />);
      expect(wrapper.find(IconButton)).toHaveLength(2);
    });

    it('zoom out is disabled when scale is 1', () => {
      const wrapper = shallowWithStyles(<ZoomControls {...props} />);
      const button = wrapper.find(IconButton).at(0);

      expect(button.prop('disabled')).toBe(true);
    });

    it('zooms out', () => {
      const wrapper = shallowWithStyles(<ZoomControls {...props} scale={1.5} />);
      wrapper
        .find(IconButton)
        .at(0)
        .simulate('click');

      expect(setScaleSpy).toHaveBeenCalled();
      expect(setScaleSpy).toHaveBeenCalledWith(1);
    });

    it('zooms in', () => {
      const wrapper = shallowWithStyles(<ZoomControls {...props} />);
      wrapper
        .find(IconButton)
        .at(1)
        .simulate('click');

      expect(setScaleSpy).toHaveBeenCalled();
      expect(setScaleSpy).toHaveBeenCalledWith(1.5);
    });
  });
});
