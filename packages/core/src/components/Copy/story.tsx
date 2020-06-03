import React from 'react';
import Button from '../Button';
import Text from '../Text';
import Copy from '.';

export default {
  title: 'Core/Copy',
  parameters: {
    inspectComponents: [Copy],
  },
};

export function copyAStringOfTextToTheClipboard() {
  return <Copy text="This string has been copied." />;
}

copyAStringOfTextToTheClipboard.story = {
  name: 'Copy a string of text to the clipboard.',
};

export function copyAsInlineWithText() {
  return (
    <Text>
      Hello, please copy <Copy text="This string has been copied." /> your text.
    </Text>
  );
}

copyAsInlineWithText.story = {
  name: 'Copy inline with text.',
};

export function withACustomPromptMessage() {
  return <Copy text="This string has been copied." prompt="Yo copy me..." />;
}

withACustomPromptMessage.story = {
  name: 'With a custom prompt message.',
};

export function withACustomElementToTriggerTheCopy() {
  return (
    <Copy text="This string has been copied.">
      <Button>Copy me!</Button>
    </Copy>
  );
}

withACustomElementToTriggerTheCopy.story = {
  name: 'With a custom element to trigger the copy.',
};

export function withInvertedTooltip() {
  return (
    <Text>
      Check out this inverted tooltip{' '}
      <Copy invertTooltip text="Inverted tooltip." prompt="Yo copy me..." />.
    </Text>
  );
}

withInvertedTooltip.story = {
  name: 'With an inverted tooltip.',
};
