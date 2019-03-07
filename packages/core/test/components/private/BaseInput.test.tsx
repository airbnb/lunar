import React from 'react';
import { shallow } from 'enzyme';
import BaseInput from '../../../src/components/private/BaseInput';
import FormInput from '../../../src/components/private/FormInput';

describe('<BaseInput />', () => {
  it('renders an input with the correct field', () => {
    const wrapper = shallow(<BaseInput name="foo" onChange={() => {}} />);

    expect(wrapper.is(FormInput)).toBe(true);
    expect(wrapper.prop('tagName')).toBe('input');
  });

  it('triggers `onChange` handler', () => {
    const spy = jest.fn();
    const wrapper = shallow(<BaseInput name="foo" onChange={spy} />);
    const event = {
      currentTarget: {
        value: 'foo',
      },
    };

    wrapper.find(FormInput).simulate('change', event);

    expect(spy).toHaveBeenCalledWith('foo', event);
  });
});
