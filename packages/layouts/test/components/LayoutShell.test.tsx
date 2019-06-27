import React from 'react';
import { shallow } from 'enzyme';
import SideBar from '../../src/components/SideBar';
import LayoutShell from '../../src/components/LayoutShell';

describe('<LayoutShell />', () => {
  it('errors if invalid `sideBar` is passed', () => {
    expect(() => {
      shallow(<LayoutShell sideBar="Sidebar">Child</LayoutShell>);
    }).toThrowError();
  });

  it('renders with content', () => {
    const wrapper = shallow(<LayoutShell>Child</LayoutShell>);

    expect(
      wrapper
        .find('div')
        .at(1)
        .text(),
    ).toBe('Child');
  });

  it('renders a sidebar', () => {
    const sidebar = <SideBar accessibilityLabel="Test">Item</SideBar>;
    const wrapper = shallow(<LayoutShell sideBar={sidebar}>Child</LayoutShell>);

    expect(wrapper.find('aside')).toHaveLength(1);
    expect(wrapper.find('aside').contains(sidebar)).toBe(true);
  });
});
