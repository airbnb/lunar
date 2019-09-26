import React from 'react';
import { mount } from 'enzyme';
import BaseMulticomplete from '@airbnb/lunar/lib/components/Multicomplete';
import Multicomplete from '../../../src/components/Form/Multicomplete';
import { toString } from '../../../src/helpers';
import { Context } from '../../../src/types';
import { WrappingFormComponent, createFormContext } from '../../utils';

describe('<Multicomplete />', () => {
  let context: Context;

  beforeEach(() => {
    context = createFormContext();
  });

  it('connects to the form', () => {
    const wrapper = mount(
      <Multicomplete
        label="Label"
        accessibilityLabel="Label"
        name="foo"
        defaultValue={['bar']}
        validator={() => {}}
        onLoadItems={() => Promise.resolve([])}
      />,
      {
        wrappingComponent: WrappingFormComponent,
        wrappingComponentProps: { context },
      },
    );

    expect(context.register).toHaveBeenCalledWith(
      expect.objectContaining({ name: 'foo', defaultValue: ['bar'], parse: toString }),
      expect.anything(),
    );

    expect(wrapper.find(BaseMulticomplete)).toHaveLength(1);
  });
});
