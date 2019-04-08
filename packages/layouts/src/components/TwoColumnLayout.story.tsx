import React from 'react';
import { storiesOf } from '@storybook/react';
import IconSettings from '@airbnb/lunar-icons/lib/interface/IconSettings';
import LoremIpsum from ':storybook/components/LoremIpsum';
import SideBar, { Item } from './SideBar';
import TwoColumnLayout from './TwoColumnLayout';

storiesOf('Layouts/TwoColumnLayout', module)
  .add('A two column layout with before (left) aside.', () => (
    <TwoColumnLayout aside={<LoremIpsum />} before>
      <LoremIpsum />
      <LoremIpsum />
      <LoremIpsum />
      <LoremIpsum />
    </TwoColumnLayout>
  ))
  .add('A two column layout with after (right) aside and a side navigation.', () => (
    <TwoColumnLayout
      after
      aside={<LoremIpsum />}
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
    </TwoColumnLayout>
  ));
