import React from 'react';
import { shallowWithStyles } from '@airbnb/lunar-test-utils';
import IconButton from '../../src/components/IconButton';
import Tooltip from '../../src/components/Tooltip';
import IconCheck from '../../../icons/src/interface/IconCheck';

describe('<IconButton />', () => {
  it('errors if a non-icon is passed', () => {
    expect(() => {
      shallowWithStyles(
        <IconButton>
          <div />
        </IconButton>,
      );
    }).toThrow();
  });

  it('renders disabled', () => {
    const wrapper = shallowWithStyles(
      <IconButton disabled>
        <IconCheck decorative />
      </IconButton>,
    );

    expect(wrapper.prop('disabled')).toBe(true);
  });

  it('wraps in a tooltip', () => {
    const wrapper = shallowWithStyles(
      <IconButton>
        <IconCheck decorative />
      </IconButton>,
    );

    expect(wrapper.find(Tooltip)).toHaveLength(0);

    wrapper.setProps({
      tooltip: 'Foo',
    });

    expect(wrapper.find(Tooltip)).toHaveLength(1);
    expect(wrapper.find(Tooltip).prop('content')).toBe('Foo');
  });
});
