import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import EmojiRestrictedPicker from './EmojiRestrictedPicker';

storiesOf('Core/EmojiRestrictedPicker', module).add('Restricted emoji picker.', () => (
  <div style={{ position: 'relative', width: 245, height: 135 }}>
    <div style={{ position: 'absolute', bottom: 0, left: 0 }}>
      <EmojiRestrictedPicker
        onClosePicker={action('onClosePicker')}
        onSelectEmoji={action('onSelectEmoji')}
      />
    </div>
  </div>
));
