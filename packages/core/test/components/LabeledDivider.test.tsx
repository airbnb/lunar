import React from 'react';
import { shallowWithStyles } from '@airbnb/lunar-test-utils';
import T from '../../src/components/Translate';
import LabeledDivider from '../../src/components/LabeledDivider';

describe('<LabeledDivider />', () => {
  it('renders a string as expected', () => {
    const wrapper = shallowWithStyles(<LabeledDivider label="Lorum ipsum" />);

    expect(wrapper).toMatchSnapshot();
  });

  it('renders a translation node as expected', () => {
    const wrapper = shallowWithStyles(
      <LabeledDivider label={<T phrase="Lorum ipsum" context="Foo" />} />,
    );

    expect(wrapper).toMatchSnapshot();
  });
});
