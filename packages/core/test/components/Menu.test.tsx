import React from 'react';
import { shallowWithStyles } from '@airbnb/lunar-test-utils';
import Menu, { Item } from '../../src/components/Menu';

describe('<Menu />', () => {
  it('renders a list with the correct role', () => {
    const wrapper = shallowWithStyles(
      <Menu accessibilityLabel="Foo">
        <Item>Child</Item>
      </Menu>,
    );

    expect(wrapper.is('ul')).toBe(true);
    expect(wrapper.prop('role')).toBe('menu');
    expect(wrapper.prop('aria-label')).toBe('Foo');

    wrapper.setProps({
      role: 'optionlist',
    });

    expect(wrapper.prop('role')).toBe('optionlist');
  });

  it('renders a list with max height', () => {
    const wrapper = shallowWithStyles(
      <Menu accessibilityLabel="Foo" maxHeight={200}>
        <Item>Child</Item>
      </Menu>,
    );

    expect(wrapper.isEmptyRender()).toBe(false);
  });
});
