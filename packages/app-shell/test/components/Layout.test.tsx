import React from 'react';
import { shallow } from 'enzyme';
import Layout from '../../src/components/Layout';

describe('Layout', () => {
  it('renderss', () => {
    const wrapper = shallowWithStyles(<Layout>Child</Layout>);

    expect(wrapper.isEmptyRender()).toBe(false);
  });
});
