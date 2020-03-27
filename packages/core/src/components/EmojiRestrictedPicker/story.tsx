import React from 'react';
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
          onClosePicker={() => console.log('onClosePicker')}
          onSelectEmoji={() => console.log('onSelectEmoji')}
        />
      </div>
    </div>
  );
}

restrictedEmojiPicker.story = {
  name: 'Restricted emoji picker.',
};
