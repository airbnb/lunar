import React from 'react';
import { shallow } from 'enzyme';
import BaseSwitch from '@airbnb/lunar/lib/components/Switch';
import { unwrapHOCs } from '@airbnb/lunar-test-utils';
import Switch from '../../../src/components/Form/Switch';
import { toBool } from '../../../src/helpers';

describe('<Switch />', () => {
  const form = {
    change() {},
    getState: () => ({} as any),
    register: jest.fn(),
  };

  it('connects to the form', () => {
    const wrapper = unwrapHOCs(
      shallow(<Switch label="Label" name="foo" defaultValue="1" validator={() => {}} />),
      'FormSwitch',
      form,
    );

    expect(form.register).toHaveBeenCalledWith(
      expect.objectContaining({ name: 'foo', defaultValue: '1', parse: toBool }),
      expect.anything(),
    );

    expect(wrapper.shallow().find(BaseSwitch)).toHaveLength(1);
  });

  it('sets checked prop', () => {
    const wrapper = unwrapHOCs(
      shallow(<Switch label="Label" name="foo" defaultValue="1" validator={() => {}} />),
      'FormSwitch',
      form,
    );

    expect(wrapper.prop('checked')).toBe(true);
  });
});
