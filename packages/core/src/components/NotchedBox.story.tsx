import React from 'react';
import { storiesOf } from '@storybook/react';
import LoremIpsum from ':storybook/components/LoremIpsum';
import Text from './Text';
import NotchedBox from './NotchedBox';

storiesOf('Core/NotchedBox', module)
  .add('Display a box with a notch.', () => (
    <NotchedBox>
      <Text>
        <LoremIpsum />
      </Text>
    </NotchedBox>
  ))
  .add('Specifying an offset.', () => (
    <NotchedBox notchOffset="50%">
      <Text>
        <LoremIpsum />
      </Text>
    </NotchedBox>
  ))
  .add('With an inverted style.', () => (
    <NotchedBox inverted>
      <Text inverted>
        <LoremIpsum />
      </Text>
    </NotchedBox>
  ))
  .add('Inline.', () => (
    <NotchedBox inline>
      <Text>Hello World</Text>
    </NotchedBox>
  ))
  .add('Inline and right-aligned notch.', () => (
    <NotchedBox inline notchOffset={-1}>
      <Text>Hello World</Text>
    </NotchedBox>
  ));
