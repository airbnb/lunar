import React from 'react';
import { shallowWithStyles } from '@airbnb/lunar-test-utils';
import IconButton from '../../../src/components/IconButton';
import RotateControls from '../../../src/components/ImageViewer/RotateControls';

describe('<RotateControls />', () => {
  const rotateSpy = jest.fn();
  const props = {
    onSetRotation: rotateSpy,
    rotation: 0,
  };

  it('renders two IconButtons', () => {
    const wrapper = shallowWithStyles(<RotateControls {...props} />);
    expect(wrapper.find(IconButton)).toHaveLength(2);
  });

  it('rotates counter-clockwise', () => {
    const wrapper = shallowWithStyles(<RotateControls {...props} />);
    // wrapper.find(Button).simulate('click');
    const buttons = wrapper.find(IconButton);
    buttons[0].simulate('click');

    expect(rotateSpy).toHaveBeenCalled();
    expect(rotateSpy).toHaveBeenCalledWith(270);
  });

  it('rotates clockwise', () => {
    const wrapper = shallowWithStyles(<RotateControls {...props} />);
    // wrapper.find(Button).simulate('click');
    const buttons = wrapper.find(IconButton);
    buttons[1].simulate('click');

    expect(rotateSpy).toHaveBeenCalled();
    expect(rotateSpy).toHaveBeenCalledWith(90);
  });
});
