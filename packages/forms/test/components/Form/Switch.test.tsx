import React from 'react';
import { mount } from 'enzyme';
import BaseSwitch from '@airbnb/lunar/lib/components/Switch';
import Switch from '../../../src/components/Form/Switch';
import { toBool } from '../../../src/helpers';
import { Context } from '../../../src/types';
import { WrappingFormComponent, createFormContext } from '../../utils';

describe('<Switch />', () => {
  let context: Context;

  beforeEach(() => {
    context = createFormContext();
  });

  it('connects to the form', () => {
    const wrapper = mount(
      <Switch label="Label" name="foo" defaultValue="1" validator={() => {}} />,
      {
        wrappingComponent: WrappingFormComponent,
        wrappingComponentProps: { context },
      },
    );

    expect(context.register).toHaveBeenCalledWith(
      expect.objectContaining({ name: 'foo', defaultValue: '1', parse: toBool }),
      expect.anything(),
    );

    expect(wrapper.find(BaseSwitch)).toHaveLength(1);
  });

  it('sets checked prop', () => {
    const wrapper = mount(
      <Switch label="Label" name="foo" defaultValue="1" validator={() => {}} />,
      {
        wrappingComponent: WrappingFormComponent,
        wrappingComponentProps: { context },
      },
    );

    expect(wrapper.find(BaseSwitch).prop('checked')).toBe(true);
  });
});
