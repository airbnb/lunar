import React from 'react';
import { shallow } from 'enzyme';
import BaseFileInput from '@airbnb/lunar/lib/components/FileInput';
import { unwrapHOCs } from '@airbnb/lunar-test-utils';
import FileInput from '../../../src/components/Form/FileInput';

describe('<FileInput />', () => {
  const form = {
    change() {},
    getState: () => ({} as any),
    register: jest.fn(),
  };

  it('connects to the form', () => {
    const wrapper = unwrapHOCs(
      shallow(<FileInput label="Label" name="foo" defaultValue="bar" validator={() => {}} />),
      'FormFileInput',
      form,
    );

    expect(form.register).toHaveBeenCalledWith(
      expect.objectContaining({ name: 'foo', defaultValue: 'bar' }),
      expect.anything(),
    );

    expect(wrapper.shallow().find(BaseFileInput)).toHaveLength(1);
  });
});
