import React from 'react';
import { mountWithStyles } from '@airbnb/lunar-test-utils';
import DangerButton from '../../src/components/DangerButton';
import ButtonOrLink from '../../src/components/private/ButtonOrLink';

describe('<DangerButton />', () => {
  it('renders a primary button', () => {
    const wrapper = mountWithStyles(<DangerButton>Button</DangerButton>);

    expect(wrapper.find(ButtonOrLink)).toHaveLength(1);
  });
});
