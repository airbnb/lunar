import React from 'react';
import { shallow } from 'enzyme';
import Switch from '../../src/components/Switch';
import FormField from '../../src/components/FormField';
import BaseSwitch from '../../src/components/private/BaseSwitch';

describe('<Switch />', () => {
  it('renders a field and input', () => {
    const wrapper = shallow(<Switch name="foo" label="Label" onChange={() => {}} />);

    expect(wrapper.find(FormField)).toHaveLength(1);
    expect(wrapper.find(BaseSwitch)).toHaveLength(1);
  });

  it('renders field inline', () => {
    const wrapper = shallow(<Switch name="foo" label="Label" onChange={() => {}} />);

    expect(wrapper.find(FormField).prop('inline')).toBe(true);
    expect(wrapper.find(FormField).prop('renderBeforeLabel')).toBeUndefined();
  });

  it('renders field with stretchLabel', () => {
    const wrapper = shallow(<Switch name="foo" label="Label" onChange={() => {}} />);

    expect(wrapper.find(FormField).prop('stretchLabel')).toBe(true);
  });

  it('generates a unique ID', () => {
    const wrapper = shallow(<Switch name="foo" label="Label" onChange={() => {}} />);

    expect(wrapper.find(FormField).prop('id')).toBe(wrapper.find(BaseSwitch).prop('id'));
  });

  it('can set checked', () => {
    const wrapper = shallow(<Switch name="foo" label="Label" onChange={() => {}} />);

    expect(wrapper.find(BaseSwitch).prop('checked')).toBe(false);

    wrapper.setProps({
      checked: true,
    });

    expect(wrapper.find(BaseSwitch).prop('checked')).toBe(true);
  });
});
