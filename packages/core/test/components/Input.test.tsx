import React from 'react';
import { shallow } from 'enzyme';
import Input from '../../src/components/Input';
import FormField from '../../src/components/FormField';
import BaseInput from '../../src/components/private/BaseInput';

describe('<Input />', () => {
  it('renders a field and input', () => {
    const wrapper = shallow(<Input name="foo" label="Label" onChange={() => {}} />);

    expect(wrapper.find(FormField)).toHaveLength(1);
    expect(wrapper.find(BaseInput)).toHaveLength(1);
  });

  it('supports hidden types', () => {
    const wrapper = shallow(<Input name="foo" label="Label" type="hidden" onChange={() => {}} />);

    expect(wrapper.find(FormField)).toHaveLength(0);
    expect(wrapper.find(BaseInput)).toHaveLength(1);
    expect(wrapper.find(BaseInput).prop('hidden')).toBe(true);
  });

  it('it generates a unique ID', () => {
    const wrapper = shallow(<Input name="foo" label="Label" onChange={() => {}} />);

    expect(wrapper.find(FormField).prop('id')).toBe(wrapper.find(BaseInput).prop('id'));
  });

  it('can change input type', () => {
    const wrapper = shallow(<Input name="foo" label="Label" onChange={() => {}} />);

    expect(wrapper.find(BaseInput).prop('type')).toBe('text');

    wrapper.setProps({
      type: 'password',
    });

    expect(wrapper.find(BaseInput).prop('type')).toBe('password');
  });
});
