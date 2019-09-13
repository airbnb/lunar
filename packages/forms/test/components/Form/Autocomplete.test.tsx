import React from 'react';
import { mount } from 'enzyme';
import BaseAutocomplete from '@airbnb/lunar/lib/components/Autocomplete';
import Autocomplete from '../../../src/components/Form/Autocomplete';
import { toString } from '../../../src/helpers';
import { Context } from '../../../src/types';
import { WrappingFormComponent, createFormContext } from '../../utils';

describe('<Autocomplete />', () => {
  let context: Context;

  beforeEach(() => {
    context = createFormContext();
  });

  it('connects to the form', () => {
    const wrapper = mount(
      <Autocomplete
        label="Label"
        accessibilityLabel="Label"
        name="foo"
        defaultValue="bar"
        validator={() => {}}
        onLoadItems={() => Promise.resolve([])}
      />,
      {
        wrappingComponent: WrappingFormComponent,
        wrappingComponentProps: { context },
      },
    );

    expect(context.register).toHaveBeenCalledWith(
      expect.objectContaining({ name: 'foo', defaultValue: 'bar', parse: toString }),
      expect.anything(),
    );

    expect(wrapper.find(BaseAutocomplete)).toHaveLength(1);
  });
});
