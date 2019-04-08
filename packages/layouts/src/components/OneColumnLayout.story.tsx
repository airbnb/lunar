import React from 'react';
import { storiesOf } from '@storybook/react';
import IconSettings from '@airbnb/lunar-icons/lib/interface/IconSettings';
import LoremIpsum from ':storybook/components/LoremIpsum';
import SideBar, { Item } from './SideBar';
import OneColumnLayout from './OneColumnLayout';

storiesOf('Layouts/OneColumnLayout', module)
  .add('A single column layout with no asides.', () => (
    <OneColumnLayout>
      <LoremIpsum />
      <LoremIpsum />
      <LoremIpsum />
      <LoremIpsum />
    </OneColumnLayout>
  ))
  .add('A single column layout with a side navigation.', () => (
    <OneColumnLayout
      sideBar={
        <SideBar accessibilityLabel="Nav">
          <Item icon={<IconSettings accessibilityLabel="Settings" />} />
        </SideBar>
      }
    >
      <LoremIpsum />
      <LoremIpsum />
      <LoremIpsum />
      <LoremIpsum />
    </OneColumnLayout>
  ));
