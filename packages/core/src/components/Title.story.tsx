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
      <Title level={3} muted>
        <LoremIpsum short />
      </Title>

      <Title level={3} inverted>
        <LoremIpsum short />
      </Title>

      <Title level={3} primary>
        <LoremIpsum short />
      </Title>
    </>
  ))
  .add('With aligned text.', () => (
    <>
      <Title level={3}>
        <LoremIpsum short />
      </Title>

      <Title level={3} centerAlign>
        <LoremIpsum short />
      </Title>

      <Title level={3} endAlign>
        <LoremIpsum short />
      </Title>
    </>
  ));
