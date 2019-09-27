import React from 'react';
import LoremIpsum from ':storybook/components/LoremIpsum';
import Aside from '../Aside';
import SplitLayout from '.';

export default {
  title: 'Layouts/SplitLayout',
  parameters: {
    inspectComponents: [SplitLayout],
  },
};

export function aSplitColumnLayoutWithBeforeAndAfterAside() {
  return (
    <SplitLayout
      after={
        <Aside>
          <LoremIpsum />
        </Aside>
      }
      before={
        <Aside>
          <LoremIpsum />
        </Aside>
      }
    />
  );
}

aSplitColumnLayoutWithBeforeAndAfterAside.story = {
  name: 'A split column layout with before and after aside.',
};
