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
  let wrapper: Enzyme.ReactWrapper<Props, any, RotateControls>;

  beforeEach(() => {
    wrapper = shallow(<RotateControls {...props} />);
  });

  it('renders two IconButtons', () => {
    expect(wrapper.find(IconButton)).toHaveLength(2);
  });

  it('rotates counter-clockwise', () => {
    const button = wrapper.find(IconButton).at(0);
    button.simulate('click');

    expect(rotateSpy).toHaveBeenCalled();
    expect(rotateSpy).toHaveBeenCalledWith(270);
  });

  it('rotates clockwise', () => {
    const button = wrapper.find(IconButton).at(1);
    button.simulate('click');

    expect(rotateSpy).toHaveBeenCalled();
    expect(rotateSpy).toHaveBeenCalledWith(90);
  });
});
