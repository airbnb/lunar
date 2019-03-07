import React from 'react';
import { shallow } from 'enzyme';
import Suffix from '../../../src/components/FormField/Suffix';
import FieldAffix from '../../../src/components/private/FieldAffix';

describe('<Suffix />', () => {
  it('renders a field affix', () => {
    const wrapper = shallow(<Suffix>Text</Suffix>);

    expect(wrapper.type()).toBe(FieldAffix);
    expect(wrapper.prop('after')).toBe(true);
  });
});
