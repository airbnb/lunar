import React from 'react';
import { mount } from 'enzyme';
import BaseRadioButtonController from '@airbnb/lunar/lib/components/RadioButtonController';
import RadioButtonController from '../../../src/components/Form/RadioButtonController';
import { toString } from '../../../src/helpers';
import { Context } from '../../../src/types';
import { WrappingFormComponent, createFormContext } from '../../utils';

describe('<RadioButtonController />', () => {
  let context: Context;

  beforeEach(() => {
    context = createFormContext();
  });

  it('connects to the form', () => {
    const wrapper = mount(
      <RadioButtonController label="Label" name="foo" defaultValue="bar" validator={() => {}}>
        {RB => (
          <div>
            <RB value="foo" label="Foo" />
            <RB value="bar" label="Bar" />
            <RB value="baz" label="Baz" />
          </div>
        )}
      </RadioButtonController>,
      {
        wrappingComponent: WrappingFormComponent,
        wrappingComponentProps: { context },
      },
    );

    expect(context.register).toHaveBeenCalledWith(
      expect.objectContaining({ name: 'foo', defaultValue: 'bar', parse: toString }),
      expect.anything(),
    );

    expect(wrapper.find(BaseRadioButtonController)).toHaveLength(1);
  });
});
