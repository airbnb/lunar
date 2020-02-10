import React from 'react';
import { renderAndWait } from 'rut-dom';
import { Emoji as BaseEmoji } from 'interweave-emoji';
import Emoji, { EmojiProps } from '../../src/components/Emoji';

describe('<Emoji />', () => {
  it('renders an emoji', async () => {
    const { root } = await renderAndWait<EmojiProps>(<Emoji shortcode=":cat:" />);

    expect(root.find(BaseEmoji)).toHaveLength(1);
  });
});
