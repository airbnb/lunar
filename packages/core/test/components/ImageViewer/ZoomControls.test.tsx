import React from 'react';
import { shallow } from 'enzyme';
import IconButton from '../../../src/components/IconButton';
import ZoomControls from '../../../src/components/ImageViewer/ZoomControls';

describe('<ZoomControls />', () => {
  const setScaleSpy = jest.fn();
  const props = {
    onScale: setScaleSpy,
    scale: 1,
  };

  describe('zoom buttons', () => {
    it('renders two IconButtons', () => {
      const wrapper = shallow(<ZoomControls {...props} />);
      expect(wrapper.find(IconButton)).toHaveLength(2);
    });

    it('zoom out is disabled when scale is 1', () => {
      const wrapper = shallow(<ZoomControls {...props} />);
      const button = wrapper.find(IconButton).at(0);

      expect(button.prop('disabled')).toBe(true);
    });

    it('zooms out', () => {
      const wrapper = shallow(<ZoomControls {...props} scale={1.5} />);
      wrapper
        .find(IconButton)
        .at(0)
        .simulate('click');

      expect(setScaleSpy).toHaveBeenCalled();
      expect(setScaleSpy).toHaveBeenCalledWith(1);
    });

    it('zooms in', () => {
      const wrapper = shallow(<ZoomControls {...props} />);
      wrapper
        .find(IconButton)
        .at(1)
        .simulate('click');

      expect(setScaleSpy).toHaveBeenCalled();
      expect(setScaleSpy).toHaveBeenCalledWith(1.5);
    });
  });
});
