import React from 'react';
import { shallow } from 'enzyme';
import BaseDateTimeSelect from '@airbnb/lunar/lib/components/DateTimeSelect';
import { unwrapHOCs } from '@airbnb/lunar-test-utils';
import DateTimeSelect from '../../../src/components/Form/DateTimeSelect';
import { toString } from '../../../src/helpers';

describe('<DateTimeSelect />', () => {
  const form = {
    change() {},
    getState: () => ({} as any),
    register: jest.fn(),
  };

  it('connects to the form', () => {
    const date = new Date().toISOString();
    const wrapper = unwrapHOCs(
      shallow(<DateTimeSelect label="Label" name="foo" defaultValue={date} validator={() => {}} />),
      'FormDateTimeSelect',
      form,
    );

    expect(form.register).toHaveBeenCalledWith(
      expect.objectContaining({ name: 'foo', defaultValue: date, parse: toString }),
      expect.anything(),
    );

    expect(wrapper.shallow().find(BaseDateTimeSelect)).toHaveLength(1);
  });
});
