import React from 'react';
import { renderAndWait, mockFetch } from 'rut-dom';
import EmojiRestrictedPicker from '@airbnb/lunar/lib/components/EmojiRestrictedPicker';
import Emojis, { EmojisProps } from '../../src/components/Emojis';
import Menu from '../../src/components/Menu';
import { Wrapper } from '../mocks';
import { MENU_EMOJIS } from '../../src/constants';

describe('<Emojis />', () => {
  beforeEach(() => {
    process.env.INTERWEAVE_ALLOW_FETCH_EMOJI = 'true';

    mockFetch('*', []);
  });

  it('renders a menu', async () => {
    const { root } = await renderAndWait<EmojisProps>(<Emojis />, {
      wrapper: <Wrapper menu={MENU_EMOJIS} />,
    });

    expect(root.find(Menu, { name: MENU_EMOJIS })).toHaveLength(1);
  });

  it('renders a restricted picker', async () => {
    const { root } = await renderAndWait<EmojisProps>(<Emojis />, {
      wrapper: <Wrapper menu={MENU_EMOJIS} />,
    });

    expect(root.find(EmojiRestrictedPicker)).toHaveLength(1);
  });

  it('renders a normal picker when internal', async () => {
    const { root } = await renderAndWait<EmojisProps>(<Emojis internal />, {
      wrapper: <Wrapper menu={MENU_EMOJIS} />,
    });

    expect(root.find(EmojiRestrictedPicker)).toHaveLength(0);
  });
});
