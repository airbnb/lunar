import React from 'react';
import { storiesOf } from '@storybook/react';
import IconSettings from '@airbnb/lunar-icons/lib/interface/IconSettings';
import LoremIpsum from ':storybook/components/LoremIpsum';
import SideBar, { Item } from './SideBar';
import Layout from './Layout';

storiesOf('Layouts/Layout', module)
  .add('Standard layout.', () => (
    <Layout>
      <LoremIpsum />
    </Layout>
  ))
  .add('With asides.', () => (
    <Layout before={<LoremIpsum />} after={<LoremIpsum />}>
      <LoremIpsum />
    </Layout>
  ))
  .add('With side bar and no background color.', () => (
    <Layout
      noBackground
      before={<LoremIpsum />}
      after={<LoremIpsum />}
      sideBar={
        <SideBar accessibilityLabel="Nav">
          <Item icon={<IconSettings accessibilityLabel="Settings" />} />
        </SideBar>
      }
    >
      <LoremIpsum />
    </Layout>
  ));
