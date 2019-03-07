A basic menu with menu items.

```jsx
import Menu, { Item } from '.';

<div style={{ width: 200 }}>
  <Menu accessibilityLabel="User menu">
    <Item>Profile</Item>
    <Item>Settings</Item>
    <Item>Log Out</Item>
  </Menu>
</div>;
```

With a separator and disabled item.

```jsx
import Menu, { Item, Separator } from '.';

<div style={{ width: 200 }}>
  <Menu accessibilityLabel="User menu">
    <Item>Profile</Item>
    <Item disabled>Settings</Item>
    <Separator />
    <Item>Log Out</Item>
  </Menu>
</div>;
```

With spacious padding and custom rows.

```jsx
import Menu, { Item, Row } from '.';
import Text from '../Text';

<div style={{ width: 200 }}>
  <Menu accessibilityLabel="User menu">
    <Row spacious>
      <Text>Lorem ipsum dolor sit amet.</Text>
    </Row>
    <Item spacious>Link</Item>
  </Menu>
</div>;
```

With links, icons (1em), and tips.

```jsx
import Menu, { Item } from '.';
import IconUser from ':icons/general/IconUser';
import IconSettings from ':icons/interface/IconSettings';
import IconKey from ':icons/interface/IconKey';

<div style={{ width: 200 }}>
  <Menu accessibilityLabel="User menu">
    <Item icon={<IconUser decorative />} href="https://github.com/airbnb/lunar" openInNewWindow>
      Profile
    </Item>
    <Item icon={<IconSettings decorative />} href="https://github.com/airbnb/lunar" openInNewWindow>
      Settings
    </Item>
    <Item
      icon={<IconKey decorative />}
      href="https://github.com/airbnb/lunar"
      tip="Cmd + L"
      openInNewWindow
    >
      Log Out
    </Item>
  </Menu>
</div>;
```

With nested sub-menus.

```jsx
import Menu, { Item } from '.';
import IconKey from ':icons/interface/IconKey';

<div style={{ width: 200 }}>
  <Menu accessibilityLabel="Menu">
    <Item>A</Item>
    <Item
      submenu={
        <Menu accessibilityLabel="B menu">
          <Item tip="Ctrl + A">B > 1</Item>
          <Item tip="Cmd + S">B > 2</Item>
          <Item
            submenu={
              <Menu accessibilityLabel="B > 3 menu">
                <Item>B > 3 > 1</Item>
              </Menu>
            }
          >
            B > 3
          </Item>
        </Menu>
      }
    >
      B
    </Item>
    <Item
      submenu={
        <Menu accessibilityLabel="C menu">
          <Item>C > 1</Item>
        </Menu>
      }
    >
      C
    </Item>
  </Menu>
</div>;
```
