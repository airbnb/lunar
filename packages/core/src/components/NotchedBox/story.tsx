import React from 'react';
import LoremIpsum from ':storybook/components/LoremIpsum';
import Text from '../Text';
import NotchedBox from '.';

export default {
  title: 'Core/NotchedBox',
  parameters: {
    inspectComponents: [NotchedBox],
  },
};

export function displayABoxWithANotch() {
  return (
    <NotchedBox>
      <Text>
        <LoremIpsum />
      </Text>
    </NotchedBox>
  );
}

displayABoxWithANotch.story = {
  name: 'Display a box with a notch.',
};

export function specifyingAnOffset() {
  return (
    <NotchedBox notchOffset="50%">
      <Text>
        <LoremIpsum />
      </Text>
    </NotchedBox>
  );
}

specifyingAnOffset.story = {
  name: 'Specifying an offset.',
};

export function withAnInvertedStyle() {
  return (
    <NotchedBox inverted>
      <Text inverted>
        <LoremIpsum />
      </Text>
    </NotchedBox>
  );
}

withAnInvertedStyle.story = {
  name: 'With an inverted style.',
};

export function inlineStory() {
  return (
    <NotchedBox inline>
      <Text>Hello World</Text>
    </NotchedBox>
  );
}

inlineStory.story = {
  name: 'Inline.',
};

export function inlineAndRightAlignedNotch() {
  return (
    <NotchedBox inline notchOffset={-1}>
      <Text>Hello World</Text>
    </NotchedBox>
  );
}

inlineAndRightAlignedNotch.story = {
  name: 'Inline and right-aligned notch.',
};
