import React from 'react';
import LoremIpsum from ':storybook/components/LoremIpsum';
import OneColumnLayout from '.';

export default {
  title: 'Layouts/OneColumnLayout',
  parameters: {
    inspectComponents: [OneColumnLayout],
  },
};

export function aSingleColumnLayoutWithNoAsides() {
  return (
    <OneColumnLayout>
      <LoremIpsum />
      <LoremIpsum />
      <LoremIpsum />
      <LoremIpsum />
    </OneColumnLayout>
  );
}

aSingleColumnLayoutWithNoAsides.story = {
  name: 'A single column layout with no asides.',
};
