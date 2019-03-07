import React from 'react';
import { shallow } from 'enzyme';
import BaseToggleButtonController from '@airbnb/lunar/lib/components/ToggleButtonController';
import { unwrapHOCs } from '@airbnb/lunar-test-utils';
import ToggleButtonController from '../../../src/components/Form/ToggleButtonController';
import { toString } from '../../../src/helpers';

describe('<ToggleButtonController />', () => {
  const form = {
    change() {},
    getState: () => ({} as any),
    register: jest.fn(),
  };

  it('connects to the form', () => {
    const wrapper = unwrapHOCs(
      shallow(
        <ToggleButtonController label="Label" name="foo" defaultValue="bar" validator={() => {}}>
          {ProxyButton => (
            <div>
              <ProxyButton value="foo">Foo</ProxyButton>
              <ProxyButton value="bar">Bar</ProxyButton>
              <ProxyButton value="baz">Baz</ProxyButton>
            </div>
          )}
        </ToggleButtonController>,
      ),
      'FormToggleButtonController',
      form,
    );

    expect(form.register).toHaveBeenCalledWith(
      expect.objectContaining({ name: 'foo', defaultValue: 'bar', parse: toString }),
      expect.anything(),
    );

    expect(wrapper.shallow().find(BaseToggleButtonController)).toHaveLength(1);
  });
});
