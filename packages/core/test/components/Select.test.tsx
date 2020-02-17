import React from 'react';
import { shallow } from 'enzyme';
import Select from '../../src/components/Select';
import FormField from '../../src/components/FormField';
import BaseSelect from '../../src/components/private/BaseSelect';

describe('<Select />', () => {
  type Value = 'foo' | 'bar' | 'baz';

  it('renders a field and input', () => {
    const wrapper = shallow(
      <Select<Value> name="foo" label="Label" onChange={() => {}}>
        <option value="">Option</option>
      </Select>,
    );

    expect(wrapper.find(FormField)).toHaveLength(1);
    expect(wrapper.find(BaseSelect)).toHaveLength(1);
  });

  it('generates a unique ID', () => {
    const wrapper = shallow(
      <Select name="foo" label="Label" onChange={() => {}}>
        <option value="">Option</option>
      </Select>,
    );

    expect(wrapper.find(FormField).prop('id')).toBe(wrapper.find(BaseSelect).prop('id'));
  });

  it('can set placeholder', () => {
    const wrapper = shallow(
      <Select name="foo" label="Label" placeholder="Select" onChange={() => {}}>
        <option value="">Option</option>
      </Select>,
    );

    expect(wrapper.find(BaseSelect).prop('placeholder')).toBe('Select');
  });

  it('can use optgroup', () => {
    const children = (
      <optgroup label="Group">
        <option value="">Option</option>
      </optgroup>
    );
    const wrapper = shallow(
      <Select name="foo" label="Label" onChange={() => {}}>
        {children}
      </Select>,
    );

    expect(wrapper.find(BaseSelect).prop('children')).toBe(children);
  });
});
