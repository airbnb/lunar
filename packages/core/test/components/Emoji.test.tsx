import React from 'react';
import { shallow } from 'enzyme';
import { Emoji as BaseEmoji } from 'interweave-emoji';
import Emoji from '../../src/components/Emoji';

jest.mock('emojibase');

describe('<Emoji />', () => {
  it('renders an emoji', () => {
    const wrapper = shallow(<Emoji />);

    expect(wrapper.find(BaseEmoji)).toHaveLength(1);
  });
});
