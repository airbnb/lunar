import React from 'react';
import { shallow } from 'enzyme';
import Layout from '../../src/components/Layout';
import OneColumnLayout from '../../src/components/OneColumnLayout';

describe('<OneColumnLayout />', () => {
  it('renders and passes props to `Layout`', () => {
    const wrapper = shallow(<OneColumnLayout fluid>Child</OneColumnLayout>);

    expect(wrapper.find(Layout).props()).toEqual(
      expect.objectContaining({
        children: 'Child',
        fluid: true,
      }),
    );
  });
});
