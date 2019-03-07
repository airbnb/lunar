import React from 'react';
import { shallow } from 'enzyme';
import BaseDatePickerInput from '@airbnb/lunar/lib/components/DatePickerInput';
import { unwrapHOCs } from '@airbnb/lunar-test-utils';
import DatePickerInput from '../../../src/components/Form/DatePickerInput';
import { toString } from '../../../src/helpers';

describe('<DatePickerInput />', () => {
  const form = {
    change() {},
    getState: () => ({} as any),
    register: jest.fn(),
  };

  it('connects to the form', () => {
    const wrapper = unwrapHOCs(
      shallow(<DatePickerInput label="Label" name="foo" defaultValue="bar" validator={() => {}} />),
      'FormDatePickerInput',
      form,
    );

    expect(form.register).toHaveBeenCalledWith(
      expect.objectContaining({ name: 'foo', defaultValue: 'bar', parse: toString }),
      expect.anything(),
    );

    expect(wrapper.shallow().find(BaseDatePickerInput)).toHaveLength(1);
  });
});
