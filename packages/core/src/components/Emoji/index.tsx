import React from 'react';
import { Emoji as BaseEmoji, EmojiProps as BaseEmojiProps, useEmojiData } from 'interweave-emoji';
import Core from '../..';

export type EmojiProps = Omit<BaseEmojiProps, 'emojiPath' | 'emojiSource'>;

/**
 * Display an emoji character using [interweave-emoji](https://github.com/milesj/interweave/tree/master/packages/interweave-emoji).
 */
export default function Emoji(props: EmojiProps) {
  const [, emojiSource] = useEmojiData({
    avoidFetch: process.env.NODE_ENV === 'test',
    throwErrors: false,
  });

  return (
    <BaseEmoji
      emojiSize="1.25em"
      emojiLargeSize="1.25em"
      {...props}
      emojiPath={Core.settings.emojiCDN}
      emojiSource={emojiSource}
    />
  );
}
