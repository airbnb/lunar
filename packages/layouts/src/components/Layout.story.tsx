import React from 'react';
import { storiesOf } from '@storybook/react';
import LoremIpsum from ':storybook/components/LoremIpsum';
import Aside from './Aside';
import Layout from './Layout';

storiesOf('Layouts/Layout', module)
  .addParameters({
    inspectComponents: [Layout],
  })
  .add('Standard layout.', () => (
    <Layout>
      <LoremIpsum />
    </Layout>
  ))
  .add('With left side, and no padding.', () => (
    <Layout
      before={
        <Aside>
          <LoremIpsum />
        </Aside>
      }
      noPadding
    >
      <LoremIpsum />
    </Layout>
  ))
  .add('With right side, and no background color.', () => (
    <Layout
      after={
        <Aside>
          <LoremIpsum />
        </Aside>
      }
      noBackground
    >
      <LoremIpsum />
    </Layout>
  ))
  .add('With both sides.', () => (
    <Layout
      before={
        <Aside>
          <LoremIpsum />
        </Aside>
      }
      after={
        <Aside>
          <LoremIpsum />
        </Aside>
      }
    >
      <LoremIpsum />
    </Layout>
  ));
