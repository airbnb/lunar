import React from 'react';
import { shallow } from 'enzyme';
import Separator from '../../../src/components/Menu/Separator';

describe('<MenuSeparator />', () => {
  it('renders a list with the correct role', () => {
    const wrapper = shallow(<Separator />);

    expect(wrapper.is('li')).toBe(true);
    expect(wrapper.prop('role')).toBe('separator');
    expect(wrapper.find('hr')).toHaveLength(1);
  });
});
