import React from 'react';
import LoremIpsum from ':storybook/components/LoremIpsum';
import Aside from '.';

export default {
  title: 'Layouts/Aside',
  parameters: {
    inspectComponents: [Aside],
  },
};

export function standardAsideWithAWidth() {
  return (
    <Aside width={300}>
      <LoremIpsum />
      <LoremIpsum />
      <LoremIpsum />
      <LoremIpsum />
    </Aside>
  );
}

standardAsideWithAWidth.story = {
  name: 'Standard aside with a width',
};

export function withABeforeLeftBorder() {
  return (
    <Aside before width={300}>
      <LoremIpsum />
      <LoremIpsum />
      <LoremIpsum />
      <LoremIpsum />
    </Aside>
  );
}

withABeforeLeftBorder.story = {
  name: 'With a before (left) border.',
};

export function withAnAfterRightBorder() {
  return (
    <Aside after width={300}>
      <LoremIpsum />
      <LoremIpsum />
      <LoremIpsum />
      <LoremIpsum />
    </Aside>
  );
}

withAnAfterRightBorder.story = {
  name: 'With an after (right) border.',
};

export function withNoPadding() {
  return (
    <Aside noPadding width={300}>
      <LoremIpsum />
      <LoremIpsum />
      <LoremIpsum />
      <LoremIpsum />
    </Aside>
  );
}

withNoPadding.story = {
  name: 'With no padding.',
};

export function asAScrollableContainer() {
  return (
    <div style={{ height: 500 }}>
      <Aside scrollable width={300}>
        <LoremIpsum />
        <LoremIpsum />
        <LoremIpsum />
        <LoremIpsum />
      </Aside>
    </div>
  );
}

asAScrollableContainer.story = {
  name: 'As a scrollable container.',
};
