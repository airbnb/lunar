import React from 'react';
import { shallowWithStyles } from '@airbnb/lunar-test-utils';
import DangerButton from '../../src/components/DangerButton';
import ButtonOrLink from '../../lib/components/private/ButtonOrLink';

describe('<DangerButton />', () => {
  it('renders a primary button', () => {
    const wrapper = shallowWithStyles(<DangerButton>Button</DangerButton>).dive();

    expect(wrapper.find(ButtonOrLink)).toHaveLength(1);
  });
});
