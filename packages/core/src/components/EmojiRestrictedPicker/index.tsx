import React from 'react';
import EmojiPicker, { EmojiPickerProps } from '../EmojiPicker';
import { EMOJI_WHITELIST } from '../../constants';

/**
 * Display an emoji picker that utilizes a restricted whitelist of acceptable emojis.
 */
export default function EmojiRestrictedPicker(props: EmojiPickerProps) {
  return (
    <EmojiPicker
      disableCommonlyUsed
      disableGroups
      disableSearch
      disableSkinTones
      hideEmoticon
      hideGroupHeaders
      hideShortcodes
      emojiLargeSize={36}
      {...props}
      rowCount={2}
      stickyGroupHeader={false}
      allowList={EMOJI_WHITELIST}
    />
  );
}
