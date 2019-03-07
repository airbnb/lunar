import React from 'react';
import { shallow } from 'enzyme';
import EmojiPicker from '../../src/components/EmojiPicker';
import EmojiRestrictedPicker from '../../src/components/EmojiRestrictedPicker';

describe('<EmojiRestrictedPicker />', () => {
  it('renders an emoji picker', () => {
    const wrapper = shallow(<EmojiRestrictedPicker onClosePicker={() => {}} />);

    expect(wrapper.find(EmojiPicker)).toHaveLength(1);
  });
});
