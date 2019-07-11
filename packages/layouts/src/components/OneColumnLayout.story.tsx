import React from 'react';
import { storiesOf } from '@storybook/react';
import LoremIpsum from ':storybook/components/LoremIpsum';
import OneColumnLayout from './OneColumnLayout';

storiesOf('Layouts/OneColumnLayout', module)
  .addParameters({
    inspectComponents: [OneColumnLayout],
  })
  .add('A single column layout with no asides.', () => (
    <OneColumnLayout>
      <LoremIpsum />
      <LoremIpsum />
      <LoremIpsum />
      <LoremIpsum />
    </OneColumnLayout>
  ));
