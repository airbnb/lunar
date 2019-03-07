import React from 'react';
import { shallow } from 'enzyme';
import BaseSelect from '@airbnb/lunar/lib/components/Select';
import { unwrapHOCs } from '@airbnb/lunar-test-utils';
import Select from '../../../src/components/Form/Select';
import { toString } from '../../../src/helpers';

describe('<Select />', () => {
  const form = {
    change() {},
    getState: () => ({} as any),
    register: jest.fn(),
  };

  it('connects to the form', () => {
    const wrapper = unwrapHOCs(
      shallow(
        <Select label="Label" name="foo" defaultValue="bar" validator={() => {}}>
          <option value="foo">Foo</option>
          <option value="bar">Bar</option>
          <option value="baz">Baz</option>
        </Select>,
      ),
      'FormSelect',
      form,
    );

    expect(form.register).toHaveBeenCalledWith(
      expect.objectContaining({ name: 'foo', defaultValue: 'bar', parse: toString }),
      expect.anything(),
    );

    expect(wrapper.shallow().find(BaseSelect)).toHaveLength(1);
  });
});
