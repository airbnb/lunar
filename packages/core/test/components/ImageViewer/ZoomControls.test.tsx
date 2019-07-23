import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Button from '../../../src/components/Button';
import IconButton from '../../../src/components/IconButton';
import ZoomControls, {
  Props,
  ZOOM_OPTIONS,
} from '../../../src/components/ImageViewer/ZoomControls';
import Menu, { Item } from '../../../src/components/Menu';

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

      expect(setScaleSpy).toHaveBeenCalledWith(1);
    });

    it('zooms out to 1', () => {
      const wrapper = shallow(<ZoomControls {...props} scale={1.25} />);
      wrapper
        .find(IconButton)
        .at(0)
        .simulate('click');

      expect(setScaleSpy).toHaveBeenCalledWith(1);
    });

    it('zooms in', () => {
      const wrapper = shallow(<ZoomControls {...props} />);
      wrapper
        .find(IconButton)
        .at(1)
        .simulate('click');

      expect(setScaleSpy).toHaveBeenCalledWith(1.5);
    });
  });

  describe('zoom menu', () => {
    let wrapper: Enzyme.ReactWrapper<Props>;

    beforeEach(() => {
      wrapper = mount(<ZoomControls {...props} />);
      wrapper
        .find(Button)
        .at(0)
        .simulate('click');
    });

    it('renders options', () => {
      expect(wrapper.find(Menu)).toHaveLength(1);
      expect(wrapper.find(Item)).toHaveLength(ZOOM_OPTIONS.length);
    });

    it('sets the zoom level when clicked', () => {
      wrapper
        .find(Item)
        .at(0)
        .simulate('click');

      expect(setScaleSpy).toHaveBeenCalledWith(ZOOM_OPTIONS[0].scale);
    });
  });
});
