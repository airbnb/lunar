import React from 'react';
import { shallowWithStyles } from '@airbnb/lunar-test-utils';
import Separator from '../../../src/components/Menu/Separator';

describe('<MenuSeparator />', () => {
  it('renders a list with the correct role', () => {
    const wrapper = shallowWithStyles(<Separator />);

    expect(wrapper.is('li')).toBe(true);
    expect(wrapper.prop('role')).toBe('separator');
    expect(wrapper.find('hr')).toHaveLength(1);
  });
});
