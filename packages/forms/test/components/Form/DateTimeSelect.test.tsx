import React from 'react';
import { mount } from 'enzyme';
import BaseDateTimeSelect from '@airbnb/lunar/lib/components/DateTimeSelect';
import DateTimeSelect from '../../../src/components/Form/DateTimeSelect';
import { toString } from '../../../src/helpers';
import { Context } from '../../../src/types';
import { WrappingFormComponent, createFormContext } from '../../utils';

describe('<DateTimeSelect />', () => {
  let context: Context;

  beforeEach(() => {
    context = createFormContext();
  });

  it('connects to the form', () => {
    const date = new Date().toISOString();
    const wrapper = mount(
      <DateTimeSelect label="Label" name="foo" defaultValue={date} validator={() => {}} />,
      {
        wrappingComponent: WrappingFormComponent,
        wrappingComponentProps: { context },
      },
    );

    expect(context.register).toHaveBeenCalledWith(
      expect.objectContaining({ name: 'foo', defaultValue: date, parse: toString }),
      expect.anything(),
    );

    expect(wrapper.find(BaseDateTimeSelect)).toHaveLength(1);
  });
});
