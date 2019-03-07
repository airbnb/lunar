import React from 'react';
import { shallow } from 'enzyme';
import T from '../../src/components/Translate';
import LabeledDivider from '../../src/components/LabeledDivider';

describe('<LabeledDivider />', () => {
  it('renders a string as expected', () => {
    const wrapper = shallow(<LabeledDivider label="Lorum ipsum" />).dive();

    expect(wrapper).toMatchSnapshot();
  });

  it('renders a translation node as expected', () => {
    const wrapper = shallow(
      <LabeledDivider label={<T phrase="Lorum ipsum" context="Foo" />} />,
    ).dive();

    expect(wrapper).toMatchSnapshot();
  });
});
