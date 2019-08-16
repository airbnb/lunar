import React from 'react';
import { mount } from 'enzyme';
import BaseFileInput from '@airbnb/lunar/lib/components/FileInput';
import FileInput from '../../../src/components/Form/FileInput';
import { Context } from '../../../src/types';
import { WrappingFormComponent, createFormContext } from '../../utils';

describe('<FileInput />', () => {
  let context: Context;

  beforeEach(() => {
    context = createFormContext();
  });

  it('connects to the form', () => {
    const wrapper = mount(<FileInput label="Label" name="foo" validator={() => {}} />, {
      wrappingComponent: WrappingFormComponent,
      wrappingComponentProps: { context },
    });

    expect(context.register).toHaveBeenCalledWith(
      expect.objectContaining({ name: 'foo' }),
      expect.anything(),
    );

    expect(wrapper.find(BaseFileInput)).toHaveLength(1);
  });
});
