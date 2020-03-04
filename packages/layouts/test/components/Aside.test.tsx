import React from 'react';
import { shallow } from 'enzyme';
import { render } from 'rut-dom';
import Aside, { AsideProps } from '../../src/components/Aside';
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

  it('can externally change expanded state', () => {
    const { root, update } = render<AsideProps>(
      <Aside after collapsible>
        Child
      </Aside>,
    );

    expect(root.findOne(Tab)).toHaveProp('expanded', true);

    update({
      expanded: false,
    });

    expect(root.findOne(Tab)).toHaveProp('expanded', false);
  });
});
