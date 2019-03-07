import React from 'react';
import { shallow } from 'enzyme';
import Prefix from '../../../src/components/FormField/Prefix';
import FieldAffix from '../../../src/components/private/FieldAffix';

describe('<Prefix />', () => {
  it('renders a field affix', () => {
    const wrapper = shallow(<Prefix>Text</Prefix>);

    expect(wrapper.type()).toBe(FieldAffix);
    expect(wrapper.prop('before')).toBe(true);
  });
});
