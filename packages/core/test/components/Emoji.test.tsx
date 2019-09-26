import React from 'react';
import { shallow } from 'enzyme';
import { Emoji as BaseEmoji } from 'interweave-emoji';
import { Emoji } from '../../src/components/Emoji';

describe('<Emoji />', () => {
  it('renders an emoji', () => {
    const wrapper = shallow(
      <Emoji
        emojis={[]}
        emojiSource={{
          compact: false,
          locale: 'en',
          version: 'latest',
        }}
        // @ts-ignore
        emojiData={{}}
      />,
    );

    expect(wrapper.find(BaseEmoji)).toHaveLength(1);
  });
});
