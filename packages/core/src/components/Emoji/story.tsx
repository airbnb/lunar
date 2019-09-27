import React from 'react';
import Emoji from '.';

export default {
  title: 'Core/Emoji',
  parameters: {
    inspectComponents: [Emoji],
  },
};

export function usingAUnicodeCharacter() {
  return <Emoji unicode="🎮️" />;
}

usingAUnicodeCharacter.story = {
  name: 'Using a unicode character.',
};

export function usingAHexcodeWithALargeSize() {
  return <Emoji enlargeEmoji hexcode="1F3AE" emojiLargeSize="3em" />;
}

usingAHexcodeWithALargeSize.story = {
  name: 'Using a hexcode with a large size.',
};
