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

  it('renders small', () => {
    const wrapper = shallowWithStyles(
      <FieldAffix after small>
        Child
      </FieldAffix>,
    );

    expect(wrapper.prop('className')).toMatch('affix_small');
  });

  it('renders large', () => {
    const wrapper = shallowWithStyles(
      <FieldAffix after large>
        Child
      </FieldAffix>,
    );

    expect(wrapper.prop('className')).toMatch('affix_large');
  });

  it('errors if both props used', () => {
    expect(() => {
      shallowWithStyles(
        <FieldAffix before after>
          Child
        </FieldAffix>,
      );
    }).toThrow();
  });
});
