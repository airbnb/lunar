import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import EmojiPicker from './EmojiPicker';

storiesOf('Core/EmojiPicker', module).add('Standard emoji picker.', () => (
  <div style={{ position: 'relative', width: 300, height: 410 }}>
    <div style={{ position: 'absolute', bottom: 0, left: 0 }}>
      <EmojiPicker
        disableAutoFocus
        onClosePicker={action('onClosePicker')}
        onSelectEmoji={action('onSelectEmoji')}
      />
    </div>
  </div>
));
