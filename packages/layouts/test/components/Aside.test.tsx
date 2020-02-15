import React from 'react';
import { shallow } from 'enzyme';
import Aside from '../../src/components/Aside';
import Tab from '../../src/components/Aside/private/Tab';

describe('<Aside />', () => {
  it('renders with content', () => {
    const wrapper = shallow(<Aside>Child</Aside>);

    expect(wrapper.contains('Child')).toBe(true);
  });

  it('renders with props enabled', () => {
    const wrapper = shallow(
      <Aside noPadding before>
        Child
      </Aside>,
    );

    expect(wrapper.contains('Child')).toBe(true);
  });

  it('renders a Tab when `collapsible` is enabled and `before`', () => {
    const wrapper = shallow(
      <Aside before collapsible>
        Child
      </Aside>,
    );

    expect(wrapper.find(Tab)).toHaveLength(1);
  });

  it('renders a Tab when `collapsible` is enabled and `after`', () => {
    const wrapper = shallow(
      <Aside after collapsible>
        Child
      </Aside>,
    );

    expect(wrapper.find(Tab)).toHaveLength(1);
  });
});
