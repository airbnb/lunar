import React from 'react';
import { shallow } from 'enzyme';
import Layout from '../../src/components/Layout';
import Aside from '../../src/components/Aside';

describe('<Layout />', () => {
  it('renders with main content', () => {
    const wrapper = shallow(<Layout>Child</Layout>);

    expect(wrapper.find('main')).toHaveLength(1);
    expect(wrapper.find('main').prop('role')).toBe('main');
    expect(wrapper.find('main').text()).toBe('Child');
  });

  it('renders with props passed', () => {
    const wrapper = shallow(
      <Layout noBackground noPadding>
        Child
      </Layout>,
    );

    expect(wrapper.find('main')).toHaveLength(1);
    expect(wrapper.find('main').prop('className')).toMatch('main main_noBackground main_noPadding');
  });

  it('renders center align', () => {
    const wrapper = shallow(<Layout centerAlign>Child</Layout>);

    expect(wrapper.find('main').childAt(0).prop('className')).toMatch(
      'mainContent mainContent_centerAlign',
    );
  });

  it('renders a before aside', () => {
    const aside = <div>Before</div>;
    const wrapper = shallow(<Layout before={<Aside>{aside}</Aside>}>Child</Layout>);

    expect(wrapper.find(Aside)).toHaveLength(1);
    expect(wrapper.find(Aside).contains(aside)).toBe(true);
  });

  it('renders an after aside', () => {
    const aside = <div>After</div>;
    const wrapper = shallow(<Layout after={<Aside>{aside}</Aside>}>Child</Layout>);

    expect(wrapper.find(Aside)).toHaveLength(1);
    expect(wrapper.find(Aside).contains(aside)).toBe(true);
  });

  it('renders both asides', () => {
    const before = <div>Before</div>;
    const after = <div>After</div>;
    const wrapper = shallow(
      <Layout before={<Aside>{before}</Aside>} after={<Aside>{after}</Aside>}>
        Child
      </Layout>,
    );
    const all = wrapper.find(Aside);

    expect(all).toHaveLength(2);
    expect(all.at(0).contains(before)).toBe(true);
    expect(all.at(1).contains(after)).toBe(true);
  });
});
