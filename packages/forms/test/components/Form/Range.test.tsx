import React from 'react';
import { mount } from 'enzyme';
import BaseRange from '@airbnb/lunar/lib/components/Range';
import Range from '../../../src/components/Form/Range';
import { toNumber } from '../../../src/helpers';
import { Context } from '../../../src/types';
import { WrappingFormComponent, createFormContext } from '../../utils';

describe('<Range />', () => {
  let context: Context;

  beforeEach(() => {
    context = createFormContext();
  });

  it('connects to the form', () => {
    const wrapper = mount(
      <Range label="Range label" name="foo" defaultValue={7} validator={() => {}} />,
      {
        wrappingComponent: WrappingFormComponent,
        wrappingComponentProps: { context },
      },
    );

    expect(context.register).toHaveBeenCalledWith(
      expect.objectContaining({ name: 'foo', defaultValue: 7, parse: toNumber }),
      expect.anything(),
    );

    expect(wrapper.find(BaseRange)).toHaveLength(1);
  });
});
