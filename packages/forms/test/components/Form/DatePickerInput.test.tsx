import React from 'react';
import { mount } from 'enzyme';
import BaseDatePickerInput from '@airbnb/lunar/lib/components/DatePickerInput';
import DatePickerInput from '../../../src/components/Form/DatePickerInput';
import { toString } from '../../../src/helpers';
import { Context } from '../../../src/types';
import { WrappingFormComponent, createFormContext } from '../../utils';

describe('<DatePickerInput />', () => {
  let context: Context;

  beforeEach(() => {
    context = createFormContext();
  });

  it('connects to the form', () => {
    const wrapper = mount(
      <DatePickerInput label="Label" name="foo" defaultValue="bar" validator={() => {}} />,
      {
        wrappingComponent: WrappingFormComponent,
        wrappingComponentProps: { context },
      },
    );

    expect(context.register).toHaveBeenCalledWith(
      expect.objectContaining({ name: 'foo', defaultValue: 'bar', parse: toString }),
      expect.anything(),
    );

    expect(wrapper.find(BaseDatePickerInput)).toHaveLength(1);
  });
});
