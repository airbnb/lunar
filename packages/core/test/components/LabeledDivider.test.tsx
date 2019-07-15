import React from 'react';
import { shallowWithStyles } from '@airbnb/lunar-test-utils';
import Text from '../../src/components/Text';
import T from '../../src/components/Translate';
import LabeledDivider from '../../src/components/LabeledDivider';

describe('<LabeledDivider />', () => {
  it('renders a string as expected', () => {
    const wrapper = shallowWithStyles(<LabeledDivider label="Lorem ipsum" />);

    expect(wrapper.find(Text).prop('children')).toBe('Lorem ipsum');
  });

  it('renders a translation node as expected', () => {
    const t = <T phrase="Lorum ipsum" context="Foo" />;
    const wrapper = shallowWithStyles(<LabeledDivider label={t} />);

    expect(wrapper.contains(t)).toBe(true);
  });
});
