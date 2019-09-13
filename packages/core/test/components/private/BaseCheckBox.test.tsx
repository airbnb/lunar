import React from 'react';
import { shallowWithStyles } from '@airbnb/lunar-test-utils';
import IconCheck from '@airbnb/lunar-icons/lib/interface/IconCheck';
import IconRemove from '@airbnb/lunar-icons/lib/interface/IconRemove';
import BaseCheckBox from '../../../src/components/private/BaseCheckBox';
import FormInput from '../../../src/components/private/FormInput';

describe('<BaseCheckBox />', () => {
  it('renders an input with the correct field', () => {
    const wrapper = shallowWithStyles(<BaseCheckBox id="foo" name="foo" onChange={() => {}} />);

    expect(wrapper.is('label')).toBe(true);
    expect(wrapper.find(FormInput).prop('tagName')).toBe('input');
    expect(wrapper.find(FormInput).prop('type')).toBe('checkbox');
    expect(wrapper.find(FormInput).prop('hidden')).toBe(true);
  });

  it('renders invalid', () => {
    const wrapper = shallowWithStyles(
      <BaseCheckBox invalid id="foo" name="foo" onChange={() => {}} />,
    );

    expect(wrapper.find(FormInput).prop('invalid')).toBe(true);
  });

  it('renders disabled', () => {
    const wrapper = shallowWithStyles(
      <BaseCheckBox disabled id="foo" name="foo" onChange={() => {}} />,
    );

    expect(wrapper.find(FormInput).prop('disabled')).toBe(true);
  });

  it('displays a checkmark when checked', () => {
    const wrapper = shallowWithStyles(<BaseCheckBox id="foo" name="foo" onChange={() => {}} />);

    expect(wrapper.find(IconCheck)).toHaveLength(0);

    wrapper.setProps({
      checked: true,
    });

    expect(wrapper.find(IconCheck)).toHaveLength(1);
  });

  it('displays a checkmark when indeterminate', () => {
    const wrapper = shallowWithStyles(<BaseCheckBox id="foo" name="foo" onChange={() => {}} />);

    expect(wrapper.find(IconRemove)).toHaveLength(0);

    wrapper.setProps({
      indeterminate: true,
    });

    expect(wrapper.find(IconRemove)).toHaveLength(1);
  });

  it('triggers `onChange` handler', () => {
    const spy = jest.fn();
    const wrapper = shallowWithStyles(<BaseCheckBox id="foo" name="foo" onChange={spy} />);
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
    const wrapper = shallowWithStyles(
      <BaseCheckBox button id="foo" name="foo" onChange={() => {}}>
        {child}
      </BaseCheckBox>,
    );

    expect(wrapper.is('label')).toBe(true);
    expect(wrapper.find('label')).toHaveLength(2);
    expect(wrapper.contains(child)).toBe(true);
  });
});
