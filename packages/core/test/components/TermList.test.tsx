import React from 'react';
import { shallowWithStyles } from '@airbnb/lunar-test-utils';
import TermList from '../../src/components/TermList';
import Term from '../../src/components/TermList/Term';
import Link from '../../src/components/Link';

describe('<DescriptionList />', () => {
  it('renders', () => {
    const wrapper = shallowWithStyles(<Term label="label">Data</Term>);
  });
});
