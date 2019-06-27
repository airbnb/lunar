import React from 'react';
import { shallow } from 'enzyme';
import BaseMulticomplete from '@airbnb/lunar/lib/components/Multicomplete';
import { unwrapHOCs } from '@airbnb/lunar-test-utils';
import Multicomplete from '../../../src/components/Form/Multicomplete';
import { toString } from '../../../src/helpers';

describe('<Multicomplete />', () => {
  const form = {
    change() {},
    getState: () => ({} as any),
    register: jest.fn(),
  };

  it('connects to the form', () => {
    const wrapper = unwrapHOCs(
      shallow(
        <Multicomplete
          label="Label"
          accessibilityLabel="Label"
          name="foo"
          defaultValue="bar"
          onLoadItems={() => Promise.resolve([])}
          validator={() => {}}
        />,
      ),
      'FormMulticomplete',
      form,
    );

    expect(form.register).toHaveBeenCalledWith(
      expect.objectContaining({ name: 'foo', defaultValue: 'bar', parse: toString }),
      expect.anything(),
    );

    expect(wrapper.shallow().find(BaseMulticomplete)).toHaveLength(1);
  });
});
