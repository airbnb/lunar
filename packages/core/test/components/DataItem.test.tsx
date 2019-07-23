import React from 'react';
import { shallowWithStyles } from '@airbnb/lunar-test-utils';
import DataItem from '../../src/components/DataItem';
import Link from '../../src/components/Link';

describe('<DataItem />', () => {
  it('renders inline', () => {
    const wrapper = shallowWithStyles(
      <DataItem inline label="key">
        Data
      </DataItem>,
    );

    expect(wrapper.prop('className')).toMatch('inline');
  });
  it('renders link', () => {
    const wrapper = shallowWithStyles(
      <DataItem inline label="key" link={<Link>details</Link>}>
        Data
      </DataItem>,
    );

    expect(wrapper.find(Link)).toHaveLength(1);
  });
});
