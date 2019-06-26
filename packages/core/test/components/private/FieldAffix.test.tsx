import React from 'react';
import { shallowWithStyles } from '@airbnb/lunar-test-utils';
import FieldAffix from '../../../src/components/private/FieldAffix';

describe('<FieldAffix />', () => {
  it('renders before and after with different classes', () => {
    const wrapper = shallowWithStyles(<FieldAffix before>Child</FieldAffix>);
    const beforeClass = wrapper.prop('className');

    wrapper.setProps({
      before: false,
      after: true,
    });

    expect(wrapper.prop('className')).not.toBe(beforeClass);
  });

  it('renders compact', () => {
    const wrapper = shallowWithStyles(
      <FieldAffix after compact>
        Child
      </FieldAffix>,
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('errors if both props used', () => {
    expect(() => {
      shallowWithStyles(
        <FieldAffix before after>
          Child
        </FieldAffix>,
      );
    }).toThrowError();
  });
});
