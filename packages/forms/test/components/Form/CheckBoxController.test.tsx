import React from 'react';
import { shallow } from 'enzyme';
import BaseCheckBoxController from '@airbnb/lunar/lib/components/CheckBoxController';
import { unwrapHOCs } from '@airbnb/lunar-test-utils';
import CheckBoxController from '../../../src/components/Form/CheckBoxController';
import { toString } from '../../../src/helpers';

describe('<CheckBoxController />', () => {
  const form = {
    change() {},
    getState: () => ({} as any),
    register: jest.fn(),
  };

  it('connects to the form', () => {
    const wrapper = unwrapHOCs(
      shallow(
        <CheckBoxController label="Label" name="foo" defaultValue="bar" validator={() => {}}>
          {CB => (
            <div>
              <CB value="foo" label="Foo" />
              <CB value="bar" label="Bar" />
              <CB value="baz" label="Baz" />
            </div>
          )}
        </CheckBoxController>,
      ),
      'FormCheckBoxController',
      form,
    );

    expect(form.register).toHaveBeenCalledWith(
      expect.objectContaining({ name: 'foo', defaultValue: 'bar', parse: toString }),
      expect.anything(),
    );

    expect(wrapper.shallow().find(BaseCheckBoxController)).toHaveLength(1);
  });

  it('passes value as an array', () => {
    const wrapper = unwrapHOCs(
      shallow(
        <CheckBoxController label="Label" name="foo" defaultValue="bar" validator={() => {}}>
          {CB => (
            <div>
              <CB value="foo" label="Foo" />
              <CB value="bar" label="Bar" />
              <CB value="baz" label="Baz" />
            </div>
          )}
        </CheckBoxController>,
      ),
      'FormCheckBoxController',
      form,
    );

    expect(wrapper.prop('value')).toEqual(['bar']);
  });
});
