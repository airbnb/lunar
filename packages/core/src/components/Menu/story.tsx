import React from 'react';
import IconUser from '@airbnb/lunar-icons/lib/general/IconUser';
import IconSettings from '@airbnb/lunar-icons/lib/interface/IconSettings';
import IconKey from '@airbnb/lunar-icons/lib/interface/IconKey';
import Text from '../Text';
import Menu, { Item, Separator, Row } from '.';

export default {
  title: 'Core/Menu',
  decorators: [(story: Function) => <div style={{ width: 200 }}>{story()}</div>],
  parameters: {
    inspectComponents: [Menu, Item, Row, Separator],
  },
};

export function aBasicMenuWithMenuItems() {
  return (
    <Menu accessibilityLabel="User menu">
      <Item>Profile</Item>
      <Item>Settings</Item>
      <Item>Log Out</Item>
    </Menu>
  );
}

aBasicMenuWithMenuItems.story = {
  name: 'A basic menu with menu items.',
};

export function withASeparatorAndDisabledItem() {
  return (
    <Menu accessibilityLabel="User menu">
      <Item>Profile</Item>
      <Item disabled>Settings</Item>
      <Separator />
      <Item>Log Out</Item>
    </Menu>
  );
}

withASeparatorAndDisabledItem.story = {
  name: 'With a separator and disabled item.',
};

export function withSpaciousPaddingAndCustomRows() {
  return (
    <Menu accessibilityLabel="User menu">
      <Row spacious>
        <Text>This is a row with very fat padding.</Text>
      </Row>
      <Item spacious>Link</Item>
    </Menu>
  );
}

withSpaciousPaddingAndCustomRows.story = {
  name: 'With spacious padding and custom rows.',
};

export function withLinksIcons1EmAndTips() {
  return (
    <Menu accessibilityLabel="User menu">
      <Item openInNewWindow icon={<IconUser decorative />} href="https://github.com/airbnb/lunar">
        Profile
      </Item>
      <Item
        openInNewWindow
        icon={<IconSettings decorative />}
        href="https://github.com/airbnb/lunar"
      >
        Settings
      </Item>
      <Item
        openInNewWindow
        icon={<IconKey decorative />}
        href="https://github.com/airbnb/lunar"
        tip="Cmd + L"
      >
        Log Out
      </Item>
    </Menu>
  );
}

withLinksIcons1EmAndTips.story = {
  name: 'With links, icons (1em), and tips.',
};

export function withNestedSubMenus() {
  return (
    <Menu accessibilityLabel="Menu">
      <Item>A</Item>
      <Item
        submenu={
          <Menu accessibilityLabel="B menu">
            <Item tip="Ctrl + A">{'B > 1'}</Item>
            <Item tip="Cmd + S">{'B > 2'}</Item>
            <Item
              submenu={
                <Menu accessibilityLabel="B > 3 menu">
                  <Item>{'B > 3 > 1'}</Item>
                </Menu>
              }
            >
              {'B > 3'}
            </Item>
          </Menu>
        }
      >
        B
      </Item>
      <Item
        submenu={
          <Menu accessibilityLabel="C menu">
            <Item>{'C > 1'}</Item>
          </Menu>
        }
      >
        C
      </Item>
    </Menu>
  );
}

withNestedSubMenus.story = {
  name: 'With nested sub-menus.',
};
