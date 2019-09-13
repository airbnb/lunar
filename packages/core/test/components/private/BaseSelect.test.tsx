import React from 'react';
import { shallowWithStyles } from '@airbnb/lunar-test-utils';
import BaseSelect from '../../../src/components/private/BaseSelect';
import FormInput from '../../../src/components/private/FormInput';

describe('<BaseSelect />', () => {
  it('renders an input with the correct field', () => {
    const wrapper = shallowWithStyles(
      <BaseSelect name="foo" onChange={() => {}}>
        <option value="bar">Bar</option>
      </BaseSelect>,
    );

    expect(wrapper.find(FormInput).prop('tagName')).toBe('select');
  });

  it('renders disabled', () => {
    const wrapper = shallowWithStyles(
      <BaseSelect disabled name="foo" onChange={() => {}}>
        <option value="bar">Bar</option>
      </BaseSelect>,
    );

    expect(wrapper.find('span').prop('className')).toMatch('arrow_disabled');
  });

  it('renders invalid', () => {
    const wrapper = shallowWithStyles(
      <BaseSelect invalid name="foo" onChange={() => {}}>
        <option value="bar">Bar</option>
      </BaseSelect>,
    );

    expect(wrapper.find('span').prop('className')).toMatch('arrow_invalid');
  });

  it('renders compact', () => {
    const wrapper = shallowWithStyles(
      <BaseSelect compact name="foo" onChange={() => {}}>
        <option value="bar">Bar</option>
      </BaseSelect>,
    );

    expect(wrapper.find('span').prop('className')).toMatch('arrow_compact');
  });

  it('renders options via children', () => {
    const option = <option value="bar">Bar</option>;
    const wrapper = shallowWithStyles(
      <BaseSelect name="foo" onChange={() => {}}>
        {option}
      </BaseSelect>,
    );

    expect(wrapper.contains(option)).toBe(true);
  });

  it('supports optgroup', () => {
    const wrapper = shallowWithStyles(
      <BaseSelect name="foo" onChange={() => {}}>
        <optgroup label="Group">
          <option value="bar">Bar</option>
        </optgroup>
        <option value="baz">Baz</option>
      </BaseSelect>,
    );

    expect(wrapper.find('optgroup')).toHaveLength(1);
    expect(wrapper.find('option')).toHaveLength(2);
  });

  it('supports a placeholder option', () => {
    const wrapper = shallowWithStyles(
      <BaseSelect name="foo" placeholder="Select something" onChange={() => {}}>
        <option value="bar">Bar</option>
      </BaseSelect>,
    );

    expect(wrapper.find('option')).toHaveLength(2);
    expect(
      wrapper
        .find('option')
        .at(0)
        .equals(
          <option disabled value="">
            Select something
          </option>,
        ),
    ).toBe(true);
  });

  it('triggers `onChange` handler', () => {
    const spy = jest.fn();
    const wrapper = shallowWithStyles(
      <BaseSelect name="foo" onChange={spy}>
        <option value="bar">Bar</option>
      </BaseSelect>,
    );
    const event = {
      currentTarget: {
        value: 'foo',
      },
    };

    wrapper.find(FormInput).simulate('change', event);

    expect(spy).toHaveBeenCalledWith('foo', event);
  });
});
