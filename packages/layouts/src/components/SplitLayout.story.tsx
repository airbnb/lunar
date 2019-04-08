import React from 'react';
import { storiesOf } from '@storybook/react';
import IconSettings from '@airbnb/lunar-icons/lib/interface/IconSettings';
import LoremIpsum from ':storybook/components/LoremIpsum';
import SideBar, { Item } from './SideBar';
import SplitLayout from './SplitLayout';

storiesOf('Layouts/SplitLayout', module)
  .add('A split column layout with before and after aside.', () => (
    <SplitLayout after={<LoremIpsum />} before={<LoremIpsum />} />
  ))
  .add('With side bar.', () => (
    <SplitLayout
      after={<LoremIpsum />}
      before={<LoremIpsum />}
      sideBar={
        <SideBar accessibilityLabel="Nav">
          <Item icon={<IconSettings accessibilityLabel="Settings" />} />
        </SideBar>
      }
    />
  ));
