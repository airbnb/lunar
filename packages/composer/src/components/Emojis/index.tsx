import React, { useCallback, useContext } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { CanonicalEmoji } from 'interweave-emoji';
import EmojiPicker from '@airbnb/lunar/lib/components/EmojiPicker';
import EmojiRestrictedPicker from '@airbnb/lunar/lib/components/EmojiRestrictedPicker';
import ComposerContext from '../../contexts/ComposerContext';
import Menu from '../Menu';
import EmojiButton from './EmojiButton';
import { MENU_EMOJIS } from '../../constants';

export type EmojisProps = {
  /** Writing to another internal user (agent-to-agent). */
  internal?: boolean;
  /** Align on the left instead of the right. */
  startAlign?: boolean;
};

export { EmojiButton };

export default function Emojis({ internal = false, startAlign = false }: EmojisProps) {
  const { flags, setData, setMenu } = useContext(ComposerContext);
  const Picker = internal ? EmojiPicker : EmojiRestrictedPicker;

  // Enable feature
  flags.emojis = true;

  // Handlers
  const handleClose = useCallback(() => {
    setMenu('');
  }, [setMenu]);

  const handleSelect = useCallback(
    (emoji: CanonicalEmoji) => {
      // istanbul ignore next
      setData('value', (value) => `${value} ${emoji.unicode}`);
    },
    [setData],
  );

  return (
    <Menu borderless endAlign={!startAlign} name={MENU_EMOJIS} startAlign={startAlign} width={320}>
      <Picker
        disableAutoFocus
        columnCount={10}
        rowCount={6}
        onClosePicker={handleClose}
        onSelectEmoji={handleSelect}
      />
    </Menu>
  );
}
