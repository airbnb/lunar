import React from 'react';
import { storiesOf } from '@storybook/react';
import LoremIpsum from ':storybook/components/LoremIpsum';
import Title from './Title';

storiesOf('Core/Title', module)
  .addParameters({
    inspectComponents: [Title],
  })
  .add('Titles with different heading levels.', () => (
    <>
      <Title level={1}>
        <LoremIpsum short />
      </Title>

      <Title level={2}>
        <LoremIpsum short />
      </Title>

      <Title level={3}>
        <LoremIpsum short />
      </Title>
    </>
  ))
  .add('With different states: muted, inverted, and primary.', () => (
    <>
      <Title muted level={3}>
        <LoremIpsum short />
      </Title>

      <Title inverted level={3}>
        <LoremIpsum short />
      </Title>

      <Title primary level={3}>
        <LoremIpsum short />
      </Title>
    </>
  ))
  .add('With aligned text.', () => (
    <>
      <Title level={3}>
        <LoremIpsum short />
      </Title>

      <Title centerAlign level={3}>
        <LoremIpsum short />
      </Title>

      <Title endAlign level={3}>
        <LoremIpsum short />
      </Title>
    </>
  ));
