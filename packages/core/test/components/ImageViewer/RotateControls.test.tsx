import React from 'react';
import { shallow } from 'enzyme';
import IconButton from '../../../src/components/IconButton';
import RotateControls from '../../../src/components/ImageViewer/RotateControls';

describe('<RotateControls />', () => {
  const rotateSpy = jest.fn();
  const props = {
    onSetRotation: rotateSpy,
    rotation: 0,
  };
  let wrapper;

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
