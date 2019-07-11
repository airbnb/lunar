import React from 'react';
import { shallowWithStyles } from '@airbnb/lunar-test-utils';
import BaseEmojiPicker from 'interweave-emoji-picker';
import EmojiPicker from '../../src/components/EmojiPicker';

describe('<EmojiPicker />', () => {
  it('renders an emoji picker', () => {
    const wrapper = shallowWithStyles(<EmojiPicker onClosePicker={() => {}} />);

    expect(wrapper.find(BaseEmojiPicker)).toHaveLength(1);
  });
});
