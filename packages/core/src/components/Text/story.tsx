import React from 'react';
import LoremIpsum from ':storybook/components/LoremIpsum';
import Text from '.';

export default {
  title: 'Core/Text',
  parameters: {
    inspectComponents: [Text],
  },
};

export function aBasicStringOfText() {
  return (
    <Text>
      <LoremIpsum />
    </Text>
  );
}

aBasicStringOfText.story = {
  name: 'A basic string of text.',
};

export function withLightBoldAndUppercasedEmphasis() {
  return (
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
  );
}

withLightBoldAndUppercasedEmphasis.story = {
  name: 'With light, bold, and uppercased emphasis.',
};

export function withDifferentSizingMicroSmallRegularDefaultAndLarge() {
  return (
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
  );
}

withDifferentSizingMicroSmallRegularDefaultAndLarge.story = {
  name: 'With different sizing: micro, small, regular (default), and large.',
};

export function withDifferentStatesMutedDisabledAndInverted() {
  return (
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
  );
}

withDifferentStatesMutedDisabledAndInverted.story = {
  name: 'With different states: muted, disabled, and inverted.',
};

export function withWhitespacePreserved() {
  return (
    <Text preserveWhitespace>
      {'     '}
      <LoremIpsum short />
      {'     '}
    </Text>
  );
}

withWhitespacePreserved.story = {
  name: 'With whitespace preserved:',
};

export function withTruncated() {
  return (
    <Text truncated>
      <LoremIpsum short /> <LoremIpsum />
    </Text>
  );
}

withTruncated.story = {
  name: 'With truncated.',
};

export function withAlignedText() {
  return (
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
  );
}

withAlignedText.story = {
  name: 'With aligned text.',
};
