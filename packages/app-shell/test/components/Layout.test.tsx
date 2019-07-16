import React from 'react';
import { shallow } from 'enzyme';
import Layout from '../../src/components/Layout';

describe('Layout', () => {
  it('renders', () => {
    const wrapper = shallow(<Layout>Child</Layout>);

    expect(wrapper.isEmptyRender()).toBe(false);
  });
});
