import React from 'react';
import { shallow } from 'enzyme';
import Divider from '../../src/components/Divider';

describe('<Divider />', () => {
  it('renders a divider', () => {
    const wrapper = shallow(<Divider />);

    expect(wrapper.find('div').prop('className')).toBe('divider');
  });

  it('can pass top and bottom to spacing', () => {
    const wrapper = shallow(<Divider bottom={4} top={2} />);

    expect(wrapper.prop('bottom')).toBe(4);
    expect(wrapper.prop('top')).toBe(2);
  });

  it('renders a short divider', () => {
    const wrapper = shallow(<Divider short />);

    expect(wrapper.find('div').prop('className')).toMatch('divider_short');
  });
});
