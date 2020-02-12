import React from 'react';
import { mountUseStyles } from '@airbnb/lunar-test-utils';
import MutedButton from '../../src/components/MutedButton';
import ButtonOrLink from '../../src/components/private/ButtonOrLink';

describe('<MutedButton />', () => {
  it('renders a secondary button', () => {
    const wrapper = mountUseStyles(<MutedButton>Button</MutedButton>);

    expect(wrapper.find(ButtonOrLink)).toHaveLength(1);
  });
});
