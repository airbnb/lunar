import React from 'react';
import { shallowWithStyles } from '@airbnb/lunar-test-utils';
import MutedButton from '../../src/components/MutedButton';

describe('<MutedButton />', () => {
  it('renders a secondary button', () => {
    const wrapper = shallowWithStyles(<MutedButton>Button</MutedButton>).dive();

    expect(wrapper).toMatchSnapshot();
  });
});
