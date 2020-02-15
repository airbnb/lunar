import React from 'react';
import { renderAndWait } from 'rut-dom';
import { Emoji as BaseEmoji } from 'interweave-emoji';
import Emoji, { Props } from '../../src/components/Emoji';

describe('<Emoji />', () => {
  it('renders an emoji', async () => {
    const { root } = await renderAndWait<Props>(<Emoji shortcode=":cat:" />);

    expect(root.find(BaseEmoji)).toHaveLength(1);
  });
});
