import React from 'react';
import { shallow } from 'enzyme';
import BaseRadioButtonController from '@airbnb/lunar/lib/components/RadioButtonController';
import { unwrapHOCs } from '@airbnb/lunar-test-utils';
import RadioButtonController from '../../../src/components/Form/RadioButtonController';
import { toString } from '../../../src/helpers';

describe('<RadioButtonController />', () => {
  const form = {
    change() {},
    getState: () => ({} as any),
    register: jest.fn(),
  };

  it('connects to the form', () => {
    const wrapper = unwrapHOCs(
      shallow(
        <RadioButtonController label="Label" name="foo" defaultValue="bar" validator={() => {}}>
          {RB => (
            <div>
              <RB value="foo" label="Foo" />
              <RB value="bar" label="Bar" />
              <RB value="baz" label="Baz" />
            </div>
          )}
        </RadioButtonController>,
      ),
      'FormRadioButtonController',
      form,
    );

    expect(form.register).toHaveBeenCalledWith(
      expect.objectContaining({ name: 'foo', defaultValue: 'bar', parse: toString }),
      expect.anything(),
    );

    expect(wrapper.shallow().find(BaseRadioButtonController)).toHaveLength(1);
  });
});
