import React from 'react';
import { shallow } from 'enzyme';
import IconCheck from '@airbnb/lunar-icons/lib/interface/IconCheck';
import IconRemove from '@airbnb/lunar-icons/lib/interface/IconRemove';
import BaseCheckBox from '../../../src/components/private/BaseCheckBox';
import FormInput from '../../../src/components/private/FormInput';

describe('<BaseCheckBox />', () => {
  it('renders an input with the correct field', () => {
    const wrapper = shallow(<BaseCheckBox id="foo" name="foo" onChange={() => {}} />).dive();

    expect(wrapper.is('label')).toBe(true);
    expect(wrapper.find(FormInput).prop('tagName')).toBe('input');
    expect(wrapper.find(FormInput).prop('type')).toBe('checkbox');
    expect(wrapper.find(FormInput).prop('hidden')).toBe(true);
  });

  it('renders invalid', () => {
    const wrapper = shallow(
      <BaseCheckBox id="foo" name="foo" onChange={() => {}} invalid />,
    ).dive();

    expect(wrapper.find(FormInput).prop('invalid')).toBe(true);
  });

  it('renders disabled', () => {
    const wrapper = shallow(
      <BaseCheckBox id="foo" name="foo" onChange={() => {}} disabled />,
    ).dive();

    expect(wrapper.find(FormInput).prop('disabled')).toBe(true);
  });

  it('displays a checkmark when checked', () => {
    const wrapper = shallow(<BaseCheckBox id="foo" name="foo" onChange={() => {}} />).dive();

    expect(wrapper.find(IconCheck)).toHaveLength(0);

    wrapper.setProps({
      checked: true,
    });

    expect(wrapper.find(IconCheck)).toHaveLength(1);
  });

  it('displays a checkmark when indeterminate', () => {
    const wrapper = shallow(<BaseCheckBox id="foo" name="foo" onChange={() => {}} />).dive();

    expect(wrapper.find(IconRemove)).toHaveLength(0);

    wrapper.setProps({
      indeterminate: true,
    });

    expect(wrapper.find(IconRemove)).toHaveLength(1);
  });

  it('triggers `onChange` handler', () => {
    const spy = jest.fn();
    const wrapper = shallow(<BaseCheckBox id="foo" name="foo" onChange={spy} />).dive();
    const event = {
      currentTarget: {
        checked: true,
        value: 'foo',
      },
    };

    wrapper.find(FormInput).simulate('change', event);

    expect(spy).toHaveBeenCalledWith(true, 'foo', event);
  });

  it('renders in button mode', () => {
    const child = <div>Child</div>;
    const wrapper = shallow(
      <BaseCheckBox id="foo" name="foo" onChange={() => {}} button>
        {child}
      </BaseCheckBox>,
    ).dive();

    expect(wrapper.is('label')).toBe(true);
    expect(wrapper.find('label')).toHaveLength(2);
    expect(wrapper.contains(child)).toBe(true);
  });
});
