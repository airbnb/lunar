import React from 'react';
import { action } from '@storybook/addon-actions';
import EmojiRestrictedPicker from '.';

export default {
  title: 'Core/EmojiRestrictedPicker',
  parameters: {
    inspectComponents: [EmojiRestrictedPicker],
  },
};

export function restrictedEmojiPicker() {
  return (
    <div style={{ position: 'relative', width: 245, height: 135 }}>
      <div style={{ position: 'absolute', bottom: 0, left: 0 }}>
        <EmojiRestrictedPicker
          onClosePicker={action('onClosePicker')}
          onSelectEmoji={action('onSelectEmoji')}
        />
      </div>
    </div>
  );
}

restrictedEmojiPicker.story = {
  name: 'Restricted emoji picker.',
};
