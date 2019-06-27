import React from 'react';
import { storiesOf } from '@storybook/react';
import LoremIpsum from ':storybook/components/LoremIpsum';
import Aside from './Aside';
import ThreeColumnLayout from './ThreeColumnLayout';

storiesOf('Layouts/ThreeColumnLayout', module)
  .addParameters({
    inspectComponents: [ThreeColumnLayout],
  })
  .add('A three column layout.', () => (
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
  ));
