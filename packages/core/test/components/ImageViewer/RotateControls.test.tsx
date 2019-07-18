import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import IconButton from '../../../src/components/IconButton';
import RotateControls, { Props } from '../../../src/components/ImageViewer/RotateControls';

describe('<RotateControls />', () => {
  const rotateSpy = jest.fn();
  const props = {
    onRotation: rotateSpy,
    rotation: 0,
  };
  let wrapper: Enzyme.ShallowWrapper<Props>;

  beforeEach(() => {
    wrapper = shallow(<RotateControls {...props} />);
  });

  it('renders two IconButtons', () => {
    expect(wrapper.find(IconButton)).toHaveLength(2);
  });

  describe('rotates counter-clockwise', () => {
    it('rotates by 90 degrees', () => {
      const button = wrapper.find(IconButton).at(0);
      button.simulate('click');

      expect(rotateSpy).toHaveBeenCalledWith(270);
    });
  });

  describe('rotates clockwise', () => {
    it('rotates by 90 degrees', () => {
      const button = wrapper.find(IconButton).at(1);
      button.simulate('click');

      expect(rotateSpy).toHaveBeenCalledWith(90);
    });

    it('sets rotation back to 0', () => {
      wrapper.setProps({ rotation: 270 });
      const button = wrapper.find(IconButton).at(1);
      button.simulate('click');

      expect(rotateSpy).toHaveBeenCalledWith(0);
    });
  });
});
