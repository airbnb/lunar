import React from 'react';
import { mount } from 'enzyme';
import BaseTextArea from '@airbnb/lunar/lib/components/TextArea';
import TextArea from '../../../src/components/Form/TextArea';
import { toString } from '../../../src/helpers';
import { Context } from '../../../src/types';
import { WrappingFormComponent, createFormContext } from '../../utils';

describe('<TextArea />', () => {
  let context: Context;

  beforeEach(() => {
    context = createFormContext();
  });

  it('connects to the form', () => {
    const wrapper = mount(
      <TextArea label="Label" name="foo" defaultValue="bar" validator={() => {}} />,
      {
        wrappingComponent: WrappingFormComponent,
        wrappingComponentProps: { context },
      },
    );

    expect(context.register).toHaveBeenCalledWith(
      expect.objectContaining({ name: 'foo', defaultValue: 'bar', parse: toString }),
      expect.anything(),
    );

    expect(wrapper.find(BaseTextArea)).toHaveLength(1);
  });
});
