import React from 'react';
import { storiesOf } from '@storybook/react';
import LoremIpsum from ':storybook/components/LoremIpsum';
import Text from './Text';

storiesOf('Core/Text', module)
  .add('A basic string of text.', () => (
    <Text>
      <LoremIpsum short />
    </Text>
  ))
  .add('With bold, light, and uppercased emphasis.', () => (
    <>
      <Text light>
        <LoremIpsum short />
      </Text>
      <Text bold>
        <LoremIpsum short />
      </Text>
      <Text uppercased>
        <LoremIpsum short />
      </Text>
    </>
  ))
  .add('With different sizing: micro, small, regular (default), and large.', () => (
    <>
      <Text micro>
        <LoremIpsum short />
      </Text>
      <Text small>
        <LoremIpsum short />
      </Text>
      <Text>
        <LoremIpsum short />
      </Text>
      <Text large>
        <LoremIpsum short />
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
      <div>
        <LoremIpsum short /> Nam leo erat, lacinia nec porttitor sed, mollis sed nibh. Nam porta sit
        amet risus quis interdum. Sed feugiat lorem vitae augue blandit, sed mollis mi laoreet.
        Donec auctor, enim eget tempus auctor, est lorem laoreet nisi, a rutrum dolor quam eget mi.
        Integer nibh orci, faucibus in dolor ut, maximus euismod erat. Nam efficitur vulputate augue
        non pretium. Suspendisse vitae dui elit. Aliquam erat volutpat. Curabitur rutrum id elit ut
        hendrerit. Pellentesque ullamcorper quam a nibh aliquam bibendum. Fusce at fermentum velit.
        Phasellus malesuada dapibus tincidunt.
      </div>
    </Text>
  ))
  .add('With aligned text.', () => (
    <>
      <Text>
        <LoremIpsum short />
      </Text>
      <Text centerAlign>
        <LoremIpsum short />
      </Text>
      <Text endAlign>
        <LoremIpsum short />
      </Text>
    </>
  ));
