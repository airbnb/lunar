import React from 'react';
import { storiesOf } from '@storybook/react';
import IconSettings from '@airbnb/lunar-icons/lib/interface/IconSettings';
import LoremIpsum from ':storybook/components/LoremIpsum';
import SideBar, { Item } from './SideBar';
import LayoutShell from './LayoutShell';

storiesOf('Layouts/LayoutShell', module)
  .addParameters({
    inspectComponents: [LayoutShell],
  })
  .add('Standard shell with no top or side bars.', () => (
    <LayoutShell>
      <LoremIpsum />
      <LoremIpsum />
      <LoremIpsum />
      <LoremIpsum />
    </LayoutShell>
  ))
  .add('With side bar and no background color.', () => (
    <LayoutShell
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
    </LayoutShell>
  ));
