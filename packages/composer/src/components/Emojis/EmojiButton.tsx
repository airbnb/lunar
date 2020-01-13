import React from 'react';
import IconStarAlt from '@airbnb/lunar-icons/lib/interface/IconStarAlt';
import T from '@airbnb/lunar/lib/components/Translate';
import ToggleButton from '../Menu/ToggleButton';
import { MENU_EMOJIS } from '../../constants';

export default function EmojiButton() {
  return (
    <ToggleButton
      accessibilityLabel={T.phrase('Open emoji picker', null, {
        key: 'composer.labels.openEmojiPicker',
      })}
      icon={IconStarAlt}
      menu={MENU_EMOJIS}
    />
  );
}
