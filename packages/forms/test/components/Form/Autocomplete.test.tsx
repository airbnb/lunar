import React from 'react';
import { shallow } from 'enzyme';
import BaseAutocomplete from '@airbnb/lunar/lib/components/Autocomplete';
import { unwrapHOCs } from '@airbnb/lunar-test-utils';
import Autocomplete from '../../../src/components/Form/Autocomplete';
import { toString } from '../../../src/helpers';

describe('<Autocomplete />', () => {
  const form = {
    change() {},
    getState: () => ({} as any),
    register: jest.fn(),
  };

  it('connects to the form', () => {
    const wrapper = unwrapHOCs(
      shallow(
        <Autocomplete
          label="Label"
          accessibilityLabel="Label"
          name="foo"
          defaultValue="bar"
          onLoadItems={() => Promise.resolve([])}
          validator={() => {}}
        />,
      ),
      'FormAutocomplete',
      form,
    );

    expect(form.register).toHaveBeenCalledWith(
      expect.objectContaining({ name: 'foo', defaultValue: 'bar', parse: toString }),
      expect.anything(),
    );

    expect(wrapper.shallow().find(BaseAutocomplete)).toHaveLength(1);
  });
});
