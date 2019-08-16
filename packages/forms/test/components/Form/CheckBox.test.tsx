import React from 'react';
import { mount } from 'enzyme';
import BaseCheckBox from '@airbnb/lunar/lib/components/CheckBox';
import CheckBox from '../../../src/components/Form/CheckBox';
import { toBool } from '../../../src/helpers';
import { Context } from '../../../src/types';
import { WrappingFormComponent, createFormContext } from '../../utils';

describe('<CheckBox />', () => {
  let context: Context;

  beforeEach(() => {
    context = createFormContext();
  });

  it('connects to the form', () => {
    const wrapper = mount(<CheckBox label="Label" name="foo" defaultValue validator={() => {}} />, {
      wrappingComponent: WrappingFormComponent,
      wrappingComponentProps: { context },
    });

    expect(context.register).toHaveBeenCalledWith(
      expect.objectContaining({ name: 'foo', defaultValue: true, parse: toBool }),
      expect.anything(),
    );

    expect(wrapper.find(BaseCheckBox)).toHaveLength(1);
  });

  it('sets checked prop', () => {
    const wrapper = mount(<CheckBox label="Label" name="foo" defaultValue validator={() => {}} />, {
      wrappingComponent: WrappingFormComponent,
      wrappingComponentProps: { context },
    });

    expect(wrapper.find(BaseCheckBox).prop('checked')).toBe(true);
  });
});
