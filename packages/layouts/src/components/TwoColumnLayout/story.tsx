import React from 'react';
import LoremIpsum from ':storybook/components/LoremIpsum';
import Aside from '../Aside';
import TwoColumnLayout from '.';

export default {
  title: 'Layouts/TwoColumnLayout',
  parameters: {
    inspectComponents: [TwoColumnLayout],
  },
};

export function aTwoColumnLayoutWithBeforeLeftAside() {
  return (
    <TwoColumnLayout
      before
      aside={
        <Aside width={300}>
          <LoremIpsum />
        </Aside>
      }
    >
      <LoremIpsum />
      <LoremIpsum />
      <LoremIpsum />
      <LoremIpsum />
    </TwoColumnLayout>
  );
}

aTwoColumnLayoutWithBeforeLeftAside.story = {
  name: 'A two column layout with before (left) aside.',
};

export function aTwoColumnLayoutWithAfterRightAside() {
  return (
    <TwoColumnLayout
      after
      aside={
        <Aside width={300}>
          <LoremIpsum />
        </Aside>
      }
    >
      <LoremIpsum />
      <LoremIpsum />
      <LoremIpsum />
      <LoremIpsum />
    </TwoColumnLayout>
  );
}

aTwoColumnLayoutWithAfterRightAside.story = {
  name: 'A two column layout with after (right) aside.',
};
