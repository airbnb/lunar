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
  .add('With left aside, and no main padding.', () => (
    <Layout
      noPadding
      before={
        <Aside width={300}>
          <LoremIpsum />
        </Aside>
      }
    >
      <LoremIpsum />
    </Layout>
  ))
  .add('With right aside, and no main background color.', () => (
    <Layout
      noBackground
      after={
        <Aside width={300}>
          <LoremIpsum />
        </Aside>
      }
    >
      <LoremIpsum />
    </Layout>
  ))
  .add('With both sides.', () => (
    <Layout
      before={
        <Aside width={300}>
          <LoremIpsum />
        </Aside>
      }
      after={
        <Aside width={300}>
          <LoremIpsum />
        </Aside>
      }
    >
      <LoremIpsum />
    </Layout>
  ));
