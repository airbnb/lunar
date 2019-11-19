import React from 'react';
import LoremIpsum from ':storybook/components/LoremIpsum';
import Aside from '../Aside';
import Layout from '.';

export default {
  title: 'Layouts/Layout',
  parameters: {
    inspectComponents: [Layout],
  },
};

export function standardLayout() {
  return (
    <Layout>
      <LoremIpsum />
    </Layout>
  );
}

standardLayout.story = {
  name: 'Standard layout.',
};

export function withAFixedHeight() {
  return (
    <Layout minHeight={300}>
      <LoremIpsum />
    </Layout>
  );
}

withAFixedHeight.story = {
  name: 'With a custom min-height.',
};

export function withLeftAsideAndNoMainPadding() {
  return (
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
  );
}

withLeftAsideAndNoMainPadding.story = {
  name: 'With left aside and no main padding.',
};

export function withRightAsideAndNoMainBackgroundColor() {
  return (
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
  );
}

withRightAsideAndNoMainBackgroundColor.story = {
  name: 'With right aside and no main background color.',
};

export function withBothSides() {
  return (
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
  );
}

withBothSides.story = {
  name: 'With both sides.',
};

export function withBothAsidesCollapsibleAndMainPadding() {
  return (
    <Layout
      before={
        <Aside before collapsible width={300}>
          <LoremIpsum />
        </Aside>
      }
      after={
        <Aside after collapsible width={300}>
          <LoremIpsum />
        </Aside>
      }
    >
      <LoremIpsum />
    </Layout>
  );
}

withBothAsidesCollapsibleAndMainPadding.story = {
  name: 'With both sides, collapsible.',
};
