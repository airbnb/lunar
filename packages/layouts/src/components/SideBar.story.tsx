import React from 'react';
import { storiesOf } from '@storybook/react';
import IconUser from '@airbnb/lunar-icons/lib/general/IconUser';
import IconSettings from '@airbnb/lunar-icons/lib/interface/IconSettings';
import IconChat from '@airbnb/lunar-icons/lib/interface/IconChat';
import SideBar, { Item } from './SideBar';

storiesOf('Layouts/SideBar', module)
  .add('A vertical sidebar with menu items.', () => (
    <SideBar accessibilityLabel="Side menu">
      <Item icon={<IconUser accessibilityLabel="Profile" />} />
      <Item icon={<IconSettings accessibilityLabel="Settings" />} />
      <Item icon={<IconChat accessibilityLabel="Chat" />} />
    </SideBar>
  ))
  .add('With labels and an active state.', () => (
    <SideBar accessibilityLabel="Side menu">
      <Item icon={<IconUser accessibilityLabel="Profile" />} label="Stats" />
      <Item icon={<IconSettings accessibilityLabel="Settings" />} label="Config" active />
      <Item icon={<IconChat accessibilityLabel="Chat" />} label="Chat" />
    </SideBar>
  ));
