import React from 'react';
import { shallow } from 'enzyme';
import BaseTextArea from '@airbnb/lunar/lib/components/TextArea';
import { unwrapHOCs } from '@airbnb/lunar-test-utils';
import TextArea from '../../../src/components/Form/TextArea';
import { toString } from '../../../src/helpers';

describe('<TextArea />', () => {
  const form = {
    change() {},
    getState: () => ({} as any),
    register: jest.fn(),
  };

  it('connects to the form', () => {
    const wrapper = unwrapHOCs(
      shallow(<TextArea label="Label" name="foo" defaultValue="bar" validator={() => {}} />),
      'FormTextArea',
      form,
    );

    expect(form.register).toHaveBeenCalledWith(
      expect.objectContaining({ name: 'foo', defaultValue: 'bar', parse: toString }),
      expect.anything(),
    );

    expect(wrapper.shallow().find(BaseTextArea)).toHaveLength(1);
  });
});
