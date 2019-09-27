import React from 'react';
import IconSettings from '@airbnb/lunar-icons/lib/interface/IconSettings';
import LoremIpsum from ':storybook/components/LoremIpsum';
import SideBar, { Item } from '../SideBar';
import LayoutShell from '.';

export default {
  title: 'Layouts/LayoutShell',
  parameters: {
    inspectComponents: [LayoutShell],
  },
};

export function standardShellWithNoTopOrSideBars() {
  return (
    <LayoutShell>
      <LoremIpsum />
      <LoremIpsum />
      <LoremIpsum />
      <LoremIpsum />
    </LayoutShell>
  );
}

standardShellWithNoTopOrSideBars.story = {
  name: 'Standard shell with no top or side bars.',
};

export function withSideBarAndNoBackgroundColor() {
  return (
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
  );
}

withSideBarAndNoBackgroundColor.story = {
  name: 'With side bar and no background color.',
};
