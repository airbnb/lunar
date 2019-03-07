import React from 'react';
import { shallow } from 'enzyme';
import BaseCheckBox from '@airbnb/lunar/lib/components/CheckBox';
import { unwrapHOCs } from '@airbnb/lunar-test-utils';
import CheckBox from '../../../src/components/Form/CheckBox';
import { toBool } from '../../../src/helpers';

describe('<CheckBox />', () => {
  const form = {
    change() {},
    getState: () => ({} as any),
    register: jest.fn(),
  };

  it('connects to the form', () => {
    const wrapper = unwrapHOCs(
      shallow(<CheckBox label="Label" name="foo" defaultValue="1" validator={() => {}} />),
      'FormCheckBox',
      form,
    );

    expect(form.register).toHaveBeenCalledWith(
      expect.objectContaining({ name: 'foo', defaultValue: '1', parse: toBool }),
      expect.anything(),
    );

    expect(wrapper.shallow().find(BaseCheckBox)).toHaveLength(1);
  });

  it('sets checked prop', () => {
    const wrapper = unwrapHOCs(
      shallow(<CheckBox label="Label" name="foo" defaultValue="1" validator={() => {}} />),
      'FormCheckBox',
      form,
    );

    expect(wrapper.prop('checked')).toBe(true);
  });
});
