import React from 'react';
import { shallow } from 'enzyme';
import BaseInput from '@airbnb/lunar/lib/components/Input';
import { unwrapHOCs } from '@airbnb/lunar-test-utils';
import Input from '../../../src/components/Form/Input';
import { toString } from '../../../src/helpers';

describe('<Input />', () => {
  const form = {
    change() {},
    getState: () => ({} as any),
    register: jest.fn(),
  };

  it('connects to the form', () => {
    const wrapper = unwrapHOCs(
      shallow(<Input label="Label" name="foo" defaultValue="bar" validator={() => {}} />),
      'FormInput',
      form,
    );

    expect(form.register).toHaveBeenCalledWith(
      expect.objectContaining({ name: 'foo', defaultValue: 'bar', parse: toString }),
      expect.anything(),
    );

    expect(wrapper.shallow().find(BaseInput)).toHaveLength(1);
  });
});
