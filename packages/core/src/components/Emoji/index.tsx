import React from 'react';
import withEmojiData, {
  WithEmojiDataProps,
  Emoji as BaseEmoji,
  EmojiProps,
} from 'interweave-emoji';
import Core from '../..';

export type Props = Partial<EmojiProps>;

/**
 * Display an emoji character using [interweave-emoji](https://github.com/milesj/interweave/tree/master/packages/interweave-emoji).
 */
export class Emoji extends React.PureComponent<Props & WithEmojiDataProps> {
  render() {
    return (
      <BaseEmoji
        emojiSize="1.25em"
        emojiLargeSize="1.25em"
        {...this.props}
        emojiPath={Core.settings.emojiCDN}
      />
    );
  }
}

export default withEmojiData({
  alwaysRender: true,
  throwErrors: false,
})(Emoji);
