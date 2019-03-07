import React from 'react';
import { shallow } from 'enzyme';
import Divider from '../../src/components/Divider';

describe('<Divider />', () => {
  it('renders a divider', () => {
    const wrapper = shallow(<Divider />).dive();

    expect(wrapper).toMatchSnapshot();
  });

  it('can pass top and bottom to spacing', () => {
    const wrapper = shallow(<Divider bottom={4} top={2} />).dive();

    expect(wrapper.prop('bottom')).toBe(4);
    expect(wrapper.prop('top')).toBe(2);
  });
});
