import React from 'react';
import { shallowWithStyles } from '@airbnb/lunar-test-utils';
import Divider from '../../src/components/Divider';

describe('<Divider />', () => {
  it('renders a divider', () => {
    const wrapper = shallowWithStyles(<Divider />);

    expect(wrapper).toMatchSnapshot();
  });

  it('can pass top and bottom to spacing', () => {
    const wrapper = shallowWithStyles(<Divider bottom={4} top={2} />);

    expect(wrapper.prop('bottom')).toBe(4);
    expect(wrapper.prop('top')).toBe(2);
  });
});
