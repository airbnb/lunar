import React from 'react';
import EmojiPicker from '.';

export default {
  title: 'Core/EmojiPicker',
  parameters: {
    inspectComponents: [EmojiPicker],
  },
};

export function standardEmojiPicker() {
  return (
    <div style={{ position: 'relative', width: 300, height: 410 }}>
      <div style={{ position: 'absolute', bottom: 0, left: 0 }}>
        <EmojiPicker
          disableAutoFocus
          onClosePicker={action('onClosePicker')}
          onSelectEmoji={action('onSelectEmoji')}
        />
      </div>
    </div>
  );
}

standardEmojiPicker.story = {
  name: 'Standard emoji picker.',
};
