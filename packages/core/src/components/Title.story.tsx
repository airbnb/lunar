import React from 'react';
import { storiesOf } from '@storybook/react';
import LoremIpsum from ':storybook/components/LoremIpsum';
import Title from './Title';

storiesOf('Core/Title', module)
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
  .add('With different states: muted and inverted.', () => (
    <>
      <Title level={3} muted>
        <LoremIpsum short />
      </Title>
      <Title level={3} inverted>
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
