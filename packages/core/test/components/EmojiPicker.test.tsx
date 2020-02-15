import React from 'react';
import { shallow } from 'enzyme';
import BaseEmojiPicker from 'interweave-emoji-picker';
import EmojiPicker from '../../src/components/EmojiPicker';

describe('<EmojiPicker />', () => {
  it('renders an emoji picker', () => {
    const wrapper = shallow(<EmojiPicker onClosePicker={() => {}} />);

    expect(wrapper.find(BaseEmojiPicker)).toHaveLength(1);
  });
});
