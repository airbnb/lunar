import React from 'react';
import { shallow } from 'enzyme';
import Text from '../../src/components/Text';
import T from '../../src/components/Translate';
import LabeledDivider from '../../src/components/LabeledDivider';

describe('<LabeledDivider />', () => {
  it('renders a string as expected', () => {
    const wrapper = shallow(<LabeledDivider label="Lorem ipsum" />);

    expect(wrapper.find(Text).prop('children')).toBe('Lorem ipsum');
  });

  it('renders a translation node as expected', () => {
    const t = <T k="key" phrase="Lorum ipsum" />;
    const wrapper = shallow(<LabeledDivider label={t} />);

    expect(wrapper.contains(t)).toBe(true);
  });
});
