import React from 'react';
import { shallowWithStyles } from '@airbnb/lunar-test-utils';
import T from '../../src/components/Translate';
import LabeledDivider from '../../src/components/LabeledDivider';

describe('<LabeledDivider />', () => {
  it('renders a string as expected', () => {
    const wrapper = shallowWithStyles(<LabeledDivider label="Lorum ipsum" />);

    expect(wrapper.contains('Lorem ipsum')).toBe(true);
  });

  it('renders a translation node as expected', () => {
    const t = <T phrase="Lorum ipsum" context="Foo" />;
    const wrapper = shallowWithStyles(<LabeledDivider label={t} />);

    expect(wrapper.contains(t)).toBe(true);
  });
});
