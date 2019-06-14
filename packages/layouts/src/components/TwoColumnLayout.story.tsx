import React from 'react';
import { storiesOf } from '@storybook/react';
import LoremIpsum from ':storybook/components/LoremIpsum';
import Aside from './Aside';
import TwoColumnLayout from './TwoColumnLayout';

storiesOf('Layouts/TwoColumnLayout', module)
  .addParameters({
    inspectComponents: [TwoColumnLayout],
  })
  .add('A two column layout with before (left) aside.', () => (
    <TwoColumnLayout
      aside={
        <Aside width={300}>
          <LoremIpsum />
        </Aside>
      }
      before
    >
      <LoremIpsum />
      <LoremIpsum />
      <LoremIpsum />
      <LoremIpsum />
    </TwoColumnLayout>
  ))
  .add('A two column layout with after (right) aside.', () => (
    <TwoColumnLayout
      aside={
        <Aside width={300}>
          <LoremIpsum />
        </Aside>
      }
      after
    >
      <LoremIpsum />
      <LoremIpsum />
      <LoremIpsum />
      <LoremIpsum />
    </TwoColumnLayout>
  ));
