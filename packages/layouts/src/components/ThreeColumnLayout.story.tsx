import React from 'react';
import { storiesOf } from '@storybook/react';
import IconSettings from '@airbnb/lunar-icons/lib/interface/IconSettings';
import LoremIpsum from ':storybook/components/LoremIpsum';
import SideBar, { Item } from './SideBar';
import ThreeColumnLayout from './ThreeColumnLayout';

storiesOf('Layouts/ThreeColumnLayout', module)
  .add('A three column layout.', () => (
    <ThreeColumnLayout after={<LoremIpsum />} before={<LoremIpsum />}>
      <LoremIpsum />
      <LoremIpsum />
      <LoremIpsum />
      <LoremIpsum />
    </ThreeColumnLayout>
  ))
  .add('A three column layout with a side navigation.', () => (
    <ThreeColumnLayout
      after={<LoremIpsum />}
      before={<LoremIpsum />}
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
    </ThreeColumnLayout>
  ));
