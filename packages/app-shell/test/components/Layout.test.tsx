import React from 'react';
import { shallowWithStyles } from '@airbnb/lunar-test-utils';
import Layout from '../../src/components/Layout';

describe('Layout', () => {
  it('renders all toasts', () => {
    const wrapper = shallowWithStyles(<Layout>Child</Layout>);

    expect(wrapper).toMatchSnapshot();
  });
});
