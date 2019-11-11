import React from 'react';
import { shallow } from 'enzyme';
import IconCheck from '@airbnb/lunar-icons/lib/interface/IconCheck';
import BaseSwitch from '../../../src/components/private/BaseSwitch';
import FormInput from '../../../src/components/private/FormInput';

describe('<BaseSwitch />', () => {
  it('renders an input with the correct field', () => {
    const wrapper = shallow(<BaseSwitch id="foo" name="foo" onChange={() => {}} />);

    expect(wrapper.is('label')).toBe(true);
    expect(wrapper.find(FormInput).prop('tagName')).toBe('input');
    expect(wrapper.find(FormInput).prop('type')).toBe('checkbox');
    expect(wrapper.find(FormInput).prop('hidden')).toBe(true);
  });

  it('renders invalid', () => {
    const wrapper = shallow(<BaseSwitch invalid id="foo" name="foo" onChange={() => {}} />);

    expect(wrapper.find(FormInput).prop('invalid')).toBe(true);
  });

  it('renders disabled', () => {
    const wrapper = shallow(<BaseSwitch disabled id="foo" name="foo" onChange={() => {}} />);

    expect(wrapper.find(FormInput).prop('disabled')).toBe(true);
  });

  it('displays a checkmark when checked', () => {
    const wrapper = shallow(<BaseSwitch id="foo" name="foo" onChange={() => {}} />);

    expect(wrapper.find(IconCheck)).toHaveLength(0);

    wrapper.setProps({
      checked: true,
    });

    expect(wrapper.find(IconCheck)).toHaveLength(1);
  });

  it('triggers `onChange` handler', () => {
    const spy = jest.fn();
    const wrapper = shallow(<BaseSwitch id="foo" name="foo" onChange={spy} />);
    const event = {
      currentTarget: {
        checked: true,
        value: 'foo',
      },
    };

    wrapper.find(FormInput).simulate('change', event);

    expect(spy).toHaveBeenCalledWith(true, 'foo', event);
  });
});
