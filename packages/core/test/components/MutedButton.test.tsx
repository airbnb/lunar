import React from 'react';
import { shallowWithStyles } from '@airbnb/lunar-test-utils';
import MutedButton from '../../src/components/MutedButton';
import ButtonOrLink from '../../src/components/private/ButtonOrLink';

describe('<MutedButton />', () => {
  it('renders a secondary button', () => {
    const wrapper = shallowWithStyles(<MutedButton>Button</MutedButton>).dive();

    expect(wrapper.find(ButtonOrLink)).toHaveLength(1);
  });
});
