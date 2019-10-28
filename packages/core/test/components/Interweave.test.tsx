import React from 'react';
import { shallow } from 'enzyme';
import { mountWithStyles } from '@airbnb/lunar-test-utils';
import { UrlMatcher } from 'interweave-autolink';
import { EmojiDataManager } from 'interweave-emoji';
import Interweave from '../../src/components/Interweave';
import Url from '../../src/components/Interweave/factories/Url';
import Email from '../../src/components/Interweave/factories/Email';

jest.mock('emojibase');

describe('<Interweave />', () => {
  const props = {
    emojis: [],
    emojiData: new EmojiDataManager('en'),
    emojiSource: {
      locale: 'en',
      version: '',
      compact: false,
    },
  };

  it('passes content', () => {
    const wrapper = shallow(<Interweave {...props} content="Foo" />);

    expect(wrapper.prop('content')).toBe('Foo');
  });

  it('autolinks urls', () => {
    const wrapper = shallow(<Interweave {...props} content="Foo http://test.com bar" />);

    expect(wrapper).toMatchSnapshot();
  });

  it('set large size prop if urls and emails are present', () => {
    const wrapper = mountWithStyles(
      <Interweave {...props} large content="Foo http://test.com bar with an email@email.com" />,
    );

    expect(wrapper.find(Url).prop('large')).toBeTruthy();
    expect(wrapper.find(Url).prop('small')).toBeFalsy();
    expect(wrapper.find(Email).prop('large')).toBeTruthy();
    expect(wrapper.find(Email).prop('small')).toBeFalsy();
  });

  it('set small size prop if urls and emails are present', () => {
    const wrapper = mountWithStyles(
      <Interweave {...props} small content="Foo http://test.com bar with an email@email.com" />,
    );

    expect(wrapper.find(Url).prop('large')).toBeFalsy();
    expect(wrapper.find(Url).prop('small')).toBeTruthy();
    expect(wrapper.find(Email).prop('large')).toBeFalsy();
    expect(wrapper.find(Email).prop('small')).toBeTruthy();
  });

  it('autolinks emails', () => {
    const wrapper = shallow(<Interweave {...props} content="Foo test@domain.com bar" />);

    expect(wrapper).toMatchSnapshot();
  });

  it('can pass custom props', () => {
    const wrapper = shallow(<Interweave {...props} content="Foo" emojiSize="3em" />);

    expect(wrapper.prop('emojiSize')).toBe('3em');
  });

  it('adds url, email, and emoji global matchers by default', () => {
    const wrapper = shallow(<Interweave {...props} withEmoticons content="Foo" />);

    expect(wrapper.prop('matchers')).toHaveLength(3);
  });

  it('merges custom matchers with global matchers', () => {
    const matcher = new UrlMatcher('foo');
    const wrapper = shallow(<Interweave {...props} content="Foo" matchers={[matcher]} />);

    expect(wrapper.prop('matchers')).toHaveLength(4);
  });

  it('filters matchers to the only list', () => {
    const wrapper = shallow(
      <Interweave {...props} content="Foo" onlyMatchers={['url', 'emoji']} />,
    );

    expect(wrapper.prop('matchers')).toHaveLength(2);
    expect(wrapper.prop('matchers')[0].propName).toBe('url');
    expect(wrapper.prop('matchers')[1].propName).toBe('emoji');
  });
});
