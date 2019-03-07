A basic menu with menu items.

```jsx
import { Item, Separator } from '.';

<div style={{ width: 200 }}>
  <MenuToggle accessibilityLabel="Actions" toggleLabel="Actions" zIndex={10}>
    <Item onClick={debug('onClick')}>Profile</Item>
    <Item onClick={debug('onClick')}>Settings</Item>
    <Separator>Log Out</Separator>
    <Item onClick={debug('onClick')}>Log Out</Item>
  </MenuToggle>
</div>;
```

With an icon to toggle.

**Note**: `small` and `large` props not supported when `toggleIcon` is provided. Use `<Icon />`'s
`size` prop to size as needed.

```jsx
import { Item, Separator } from '.';

import IconMenuDots from ':icons/interface/IconMenuDots';

<div style={{ width: 200 }}>
  <MenuToggle
    accessibilityLabel="Actions"
    toggleIcon={<IconMenuDots decorative />}
    toggleLabel="Actions"
    zIndex={10}
  >
    <Item onClick={debug('onClick')}>Profile</Item>
    <Item onClick={debug('onClick')}>Settings</Item>
    <Separator>Log Out</Separator>
    <Item onClick={debug('onClick')}>Log Out</Item>
  </MenuToggle>
</div>;
```

Close on click of an item.

```jsx
import { Item, Separator } from '.';

<div style={{ width: 200 }}>
  <MenuToggle closeOnClick accessibilityLabel="Actions" toggleLabel="Actions" zIndex={10}>
    <Item onClick={() => console.log('Clicked Profile!')}>Profile</Item>
    <Item onClick={() => console.log('Clicked Settings!')}>Settings</Item>
    <Separator>Log Out</Separator>
    <Item onClick={() => console.log('Clicked Log Out!')}>Log Out</Item>
  </MenuToggle>
</div>;
```

Ignore click on outside.

```jsx
import { Item, Separator } from '.';

<div style={{ width: 200 }}>
  <MenuToggle ignoreClickOutside accessibilityLabel="Actions" toggleLabel="Actions" zIndex={10}>
    <Item onClick={debug('onClick')}>Profile</Item>
    <Item onClick={debug('onClick')}>Settings</Item>
    <Separator>Log Out</Separator>
    <Item onClick={debug('onClick')}>Log Out</Item>
  </MenuToggle>
</div>;
```

Left align.

```jsx
import { Item, Separator } from '.';

<div style={{ width: 200 }}>
  <MenuToggle
    accessibilityLabel="Actions"
    toggleLabel="Actions"
    zIndex={10}
    dropdownProps={{ left: 0 }}
  >
    <Item onClick={debug('onClick')}>Profile</Item>
    <Item onClick={debug('onClick')}>Settings</Item>
    <Separator>Log Out</Separator>
    <Item onClick={debug('onClick')}>Log Out</Item>
  </MenuToggle>
</div>;
```

Max height.

```jsx
import { Item, Separator } from '.';

<div style={{ width: 200 }}>
  <MenuToggle
    accessibilityLabel="Actions"
    menuProps={{ maxHeight: 100 }}
    toggleLabel="Actions"
    zIndex={10}
  >
    <Item onClick={debug('onClick')}>Profile</Item>
    <Item onClick={debug('onClick')}>Settings</Item>
    <Separator>Log Out</Separator>
    <Item onClick={debug('onClick')}>Log Out</Item>
  </MenuToggle>
</div>;
```

Large.

```jsx
import { Item, Separator } from '.';

<div style={{ width: 200 }}>
  <MenuToggle large accessibilityLabel="Actions" toggleLabel="Actions" zIndex={10}>
    <Item onClick={debug('onClick')}>Profile</Item>
    <Item onClick={debug('onClick')}>Settings</Item>
    <Separator>Log Out</Separator>
    <Item onClick={debug('onClick')}>Log Out</Item>
  </MenuToggle>
</div>;
```

Small.

```jsx
import { Item, Separator } from '.';

<div style={{ width: 200 }}>
  <MenuToggle small accessibilityLabel="Actions" toggleLabel="Actions" zIndex={10}>
    <Item onClick={debug('onClick')}>Profile</Item>
    <Item onClick={debug('onClick')}>Settings</Item>
    <Separator>Log Out</Separator>
    <Item onClick={debug('onClick')}>Log Out</Item>
  </MenuToggle>
</div>;
```
