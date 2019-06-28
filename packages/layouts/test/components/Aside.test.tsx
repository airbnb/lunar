import React from 'react';
import { shallow } from 'enzyme';
import Aside from '../../src/components/Aside';

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
});
