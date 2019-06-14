import React from 'react';
import { storiesOf } from '@storybook/react';
import LoremIpsum from ':storybook/components/LoremIpsum';
import Aside from './Aside';

storiesOf('Layouts/Aside', module)
  .addParameters({
    inspectComponents: [Aside],
  })
  .add('Standard aside with a width', () => (
    <Aside width={300}>
      <LoremIpsum />
      <LoremIpsum />
      <LoremIpsum />
      <LoremIpsum />
    </Aside>
  ))
  .add('With a before (left) border.', () => (
    <Aside before width={300}>
      <LoremIpsum />
      <LoremIpsum />
      <LoremIpsum />
      <LoremIpsum />
    </Aside>
  ))
  .add('With an after (right) border.', () => (
    <Aside after width={300}>
      <LoremIpsum />
      <LoremIpsum />
      <LoremIpsum />
      <LoremIpsum />
    </Aside>
  ))
  .add('With no padding.', () => (
    <Aside noPadding width={300}>
      <LoremIpsum />
      <LoremIpsum />
      <LoremIpsum />
      <LoremIpsum />
    </Aside>
  ))
  .add('As a scrollable container.', () => (
    <div style={{ height: 500 }}>
      <Aside scrollable width={300}>
        <LoremIpsum />
        <LoremIpsum />
        <LoremIpsum />
        <LoremIpsum />
      </Aside>
    </div>
  ));
