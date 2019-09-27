import React from 'react';
import Button from '../Button';
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
