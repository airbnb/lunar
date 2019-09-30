import React from 'react';
import LoremIpsum from ':storybook/components/LoremIpsum';
import Aside from '../Aside';
import ThreeColumnLayout from '.';

export default {
  title: 'Layouts/ThreeColumnLayout',
  parameters: {
    inspectComponents: [ThreeColumnLayout],
  },
};

export function aThreeColumnLayout() {
  return (
    <ThreeColumnLayout
      after={
        <Aside width={300}>
          <LoremIpsum />
        </Aside>
      }
      before={
        <Aside width={300}>
          <LoremIpsum />
        </Aside>
      }
    >
      <LoremIpsum />
      <LoremIpsum />
      <LoremIpsum />
      <LoremIpsum />
    </ThreeColumnLayout>
  );
}

aThreeColumnLayout.story = {
  name: 'A three column layout.',
};
