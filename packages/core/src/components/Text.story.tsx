import React from 'react';
import { storiesOf } from '@storybook/react';
import Text from './Text';

storiesOf('Core/Text', module)
  .add('A basic string of text.', () => (
    <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
  ))
  .add('With bold, light, and uppercased emphasis.', () => (
    <>
      <Text light>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
      <Text bold>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
      <Text uppercased>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
    </>
  ))
  .add('With different sizing: micro, small, regular (default), and large.', () => (
    <>
      <Text micro>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
      <Text small>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
      <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
      <Text large>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
    </>
  ))
  .add('With different states: muted, disabled, and inverted.', () => (
    <>
      <Text muted>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
      <Text disabled>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
      <Text inverted>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
    </>
  ))
  .add('With whitespace preserved:', () => (
    <Text preserveWhitespace>
      {'     '}
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      {'     '}
    </Text>
  ))
  .add('With truncated.', () => (
    <Text truncated>
      <div>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam leo erat, lacinia nec porttitor
        sed, mollis sed nibh. Nam porta sit amet risus quis interdum. Sed feugiat lorem vitae augue
        blandit, sed mollis mi laoreet. Donec auctor, enim eget tempus auctor, est lorem laoreet
        nisi, a rutrum dolor quam eget mi. Integer nibh orci, faucibus in dolor ut, maximus euismod
        erat. Nam efficitur vulputate augue non pretium. Suspendisse vitae dui elit. Aliquam erat
        volutpat. Curabitur rutrum id elit ut hendrerit. Pellentesque ullamcorper quam a nibh
        aliquam bibendum. Fusce at fermentum velit. Phasellus malesuada dapibus tincidunt.
      </div>
    </Text>
  ))
  .add('With aligned text.', () => (
    <>
      <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
      <Text centerAlign>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
      <Text endAlign>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
    </>
  ));
