import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import IconMenuDots from '@airbnb/lunar-icons/lib/interface/IconMenuDots';
import MenuToggle, { Item } from './MenuToggle';

const children = [
  <Item key="0" onClick={action('onClick')}>
    Profile
  </Item>,
  <Item key="1" onClick={action('onClick')}>
    Settings
  </Item>,
  <Item key="2" onClick={action('onClick')}>
    Log Out
  </Item>,
];

storiesOf('Core/MenuToggle', module)
  .addDecorator(story => <div style={{ width: 200, margin: 'auto' }}>{story()}</div>)
  .add('A basic menu with menu items.', () => (
    <MenuToggle accessibilityLabel="Actions" toggleLabel="Actions" zIndex={10}>
      {children}
    </MenuToggle>
  ))
  .add('With custom icon.', () => (
    <MenuToggle
      accessibilityLabel="Actions"
      toggleIcon={<IconMenuDots decorative />}
      toggleLabel="Actions"
      zIndex={10}
    >
      {children}
    </MenuToggle>
  ))
  .add('Close on click of an item.', () => (
    <MenuToggle closeOnClick accessibilityLabel="Actions" toggleLabel="Actions" zIndex={10}>
      {children}
    </MenuToggle>
  ))
  .add('Ignore click on outside.', () => (
    <MenuToggle ignoreClickOutside accessibilityLabel="Actions" toggleLabel="Actions" zIndex={10}>
      {children}
    </MenuToggle>
  ))
  .add('As left align.', () => (
    <MenuToggle
      accessibilityLabel="Actions"
      toggleLabel="Actions"
      zIndex={10}
      dropdownProps={{ left: 0 }}
    >
      {children}
    </MenuToggle>
  ))
  .add('With max height.', () => (
    <MenuToggle
      accessibilityLabel="Actions"
      menuProps={{ maxHeight: 100 }}
      toggleLabel="Actions"
      zIndex={10}
    >
      {children}
    </MenuToggle>
  ))
  .add('As large.', () => (
    <MenuToggle large accessibilityLabel="Actions" toggleLabel="Actions" zIndex={10}>
      {children}
    </MenuToggle>
  ))
  .add('As small.', () => (
    <MenuToggle small accessibilityLabel="Actions" toggleLabel="Actions" zIndex={10}>
      {children}
    </MenuToggle>
  ));
