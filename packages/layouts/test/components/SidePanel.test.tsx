import React from 'react';
import { shallow } from 'enzyme';
import SidePanel from '../../src/components/SidePanel';
import IconChevronLeft from '@airbnb/lunar-icons/lib/interface/IconChevronLeft';

describe('<SidePanel />', () => {
  it('renders the collapsible button icon', () => {
    const wrapper = shallow(<SidePanel collapsible sidePane={<div />} mainPane={<div />} />).dive();
    const icon = <IconChevronLeft color="#484848" size="1.1rem" inline={false} />;

    expect(wrapper.contains(icon)).toBe(true);
  });
});
