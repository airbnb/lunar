import React from 'react';
import { shallow } from 'enzyme';
import SideBar from '../../src/components/SideBar';
import Layout from '../../src/components/Layout';

describe('<Layout />', () => {
  it('errors if invalid `sideBar` is passed', () => {
    expect(() => {
      shallow(<Layout sideBar="Sidebar">Child</Layout>).dive();
    }).toThrowErrorMatchingSnapshot();
  });

  it('renders with main content', () => {
    const wrapper = shallow(<Layout>Child</Layout>).dive();

    expect(wrapper.find('main')).toHaveLength(1);
    expect(wrapper.find('main').prop('role')).toBe('main');
    expect(wrapper.find('main').text()).toBe('Child');
  });

  it('renders a sidebar', () => {
    const sidebar = <SideBar accessibilityLabel="Test">Item</SideBar>;
    const wrapper = shallow(<Layout sideBar={sidebar}>Child</Layout>).dive();

    expect(wrapper.find('aside')).toHaveLength(1);
    expect(wrapper.find('aside').contains(sidebar)).toBe(true);
  });

  it('renders a before aside', () => {
    const aside = <div>Before</div>;
    const wrapper = shallow(<Layout before={aside}>Child</Layout>).dive();

    expect(wrapper.find('aside')).toHaveLength(1);
    expect(wrapper.find('aside').contains(aside)).toBe(true);
  });

  it('renders an after aside', () => {
    const aside = <div>After</div>;
    const wrapper = shallow(<Layout after={aside}>Child</Layout>).dive();

    expect(wrapper.find('aside')).toHaveLength(1);
    expect(wrapper.find('aside').contains(aside)).toBe(true);
  });

  it('renders all 3 aside types', () => {
    const sidebar = <SideBar accessibilityLabel="Test">Item</SideBar>;
    const before = <div>Before</div>;
    const after = <div>After</div>;
    const wrapper = shallow(
      <Layout sideBar={sidebar} before={before} after={after}>
        Child
      </Layout>,
    ).dive();
    const all = wrapper.find('aside');

    expect(all).toHaveLength(3);
    expect(all.at(0).contains(sidebar)).toBe(true);
    expect(all.at(1).contains(before)).toBe(true);
    expect(all.at(2).contains(after)).toBe(true);
  });
});
