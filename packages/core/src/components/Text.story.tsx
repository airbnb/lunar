import React from 'react';
import { storiesOf } from '@storybook/react';
import LoremIpsum from ':storybook/components/LoremIpsum';
import Text from './Text';

storiesOf('Core/Text', module)
  .addParameters({
    inspectComponents: [Text],
  })
  .add('A basic string of text.', () => (
    <Text>
      <LoremIpsum />
    </Text>
  ))
  .add('With light, bold, and uppercased emphasis.', () => (
    <>
      <Text light>
        <LoremIpsum />
      </Text>
      <br />
      <Text bold>
        <LoremIpsum />
      </Text>
      <br />
      <Text uppercased>
        <LoremIpsum />
      </Text>
    </>
  ))
  .add('With different sizing: micro, small, regular (default), and large.', () => (
    <>
      <Text micro>
        <LoremIpsum />
      </Text>
      <br />
      <Text small>
        <LoremIpsum />
      </Text>
      <br />
      <Text>
        <LoremIpsum />
      </Text>
      <br />
      <Text large>
        <LoremIpsum />
      </Text>
    </>
  ))
  .add('With different states: muted, disabled, and inverted.', () => (
    <>
      <Text muted>
        <LoremIpsum short />
      </Text>
      <Text disabled>
        <LoremIpsum short />
      </Text>
      <Text inverted>
        <LoremIpsum short />
      </Text>
    </>
  ))
  .add('With whitespace preserved:', () => (
    <Text preserveWhitespace>
      {'     '}
      <LoremIpsum short />
      {'     '}
    </Text>
  ))
  .add('With truncated.', () => (
    <Text truncated>
      <LoremIpsum short /> <LoremIpsum />
    </Text>
  ))
  .add('With aligned text.', () => (
    <div style={{ textAlign: 'center' }}>
      <Text>
        <Text bold>Parent alignment</Text> <LoremIpsum short />
      </Text>
      <br />
      <Text startAlign>
        <Text bold>Start align</Text> <LoremIpsum short />
      </Text>
      <br />
      <Text centerAlign>
        <Text bold>Center align</Text> <LoremIpsum short />
      </Text>
      <br />
      <Text endAlign>
        <Text bold>End align</Text> <LoremIpsum short />
      </Text>
    </div>
  ));
