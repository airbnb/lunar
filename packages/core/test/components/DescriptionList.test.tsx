import React from 'react';
import { shallowWithStyles } from '@airbnb/lunar-test-utils';
import DescriptionList from '../../src/components/DescriptionList';
import Link from '../../src/components/Link';

describe('<DescriptionList />', () => {
  it('renders', () => {
    const wrapper = shallowWithStyles(<DescriptionList>Data</DescriptionList>);
  });
});
