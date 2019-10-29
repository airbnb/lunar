import React from 'react';
import { shallowWithStyles } from '@airbnb/lunar-test-utils';
import MessageItem from '../../src/components/MessageItem';
import IconCheck from '../../../icons/src/interface/IconCheck';
import ProfilePhoto from '../../src/components/ProfilePhoto';
import Shimmer from '../../src/components/Shimmer';
import Text from '../../src/components/Text';

describe('<MessageItem>', () => {
  const url = 'https://image.com';
  const timestamp = '11:56 AM';
  const title = 'title';

  const props = {
    formattedTimestamp: timestamp,
    imageSrc: url,
    title,
  };

  it('renders a message item', () => {
    const wrapper = shallowWithStyles(<MessageItem {...props}>Hello world</MessageItem>);

    expect(wrapper.debug()).toContain(title);
    expect(wrapper.debug()).toContain(timestamp);
    expect(wrapper.debug()).toContain(url);
  });

  it('renders a loading author', () => {
    const wrapper = shallowWithStyles(
      <MessageItem loadingAuthor {...props}>
        Hello world
      </MessageItem>,
    );

    expect(wrapper.find(Shimmer)).toHaveLength(2);
  });

  it('renders a sending overlay when message is sending', () => {
    const wrapper = shallowWithStyles(
      <MessageItem sending {...props}>
        Hello world
      </MessageItem>,
    );

    expect(wrapper.find('div.sendingOverlay')).toHaveLength(1);
  });

  it('renders an email when given', () => {
    const email = 'foo@airbnb.com';

    const wrapper = shallowWithStyles(
      <MessageItem {...props} email={email}>
        Hello world
      </MessageItem>,
    );

    expect(wrapper.debug()).toContain(email);
  });

  it('renders a source when given', () => {
    const source = 'web';
    const wrapper = shallowWithStyles(
      <MessageItem {...props} source={source}>
        Hello world
      </MessageItem>,
    );

    expect(wrapper.debug()).toContain(source);
  });

  it('renders a title tag when given', () => {
    const titleTag = 'CX';

    const wrapper = shallowWithStyles(
      <MessageItem {...props} titleTag={titleTag}>
        Hello world
      </MessageItem>,
    );

    expect(wrapper.debug()).toContain(titleTag);
  });

  it('renders the title with a `button` when `onClickTitle` is true', () => {
    const onClickTitle = () => {};

    const wrapper = shallowWithStyles(
      <MessageItem {...props} onClickTitle={onClickTitle}>
        Hello world
      </MessageItem>,
    );

    expect(wrapper.find('button')).toHaveLength(1);
    expect(
      wrapper
        .find('button')
        .find(Text)
        .prop('children'),
    ).toBe(title);
  });

  it('renders the profile photo with a `button` when `onClickImage` is given', () => {
    const onClickImage = () => {};

    const wrapper = shallowWithStyles(
      <MessageItem {...props} onClickImage={onClickImage}>
        Hello world
      </MessageItem>,
    );

    expect(
      wrapper
        .find(ProfilePhoto)
        .parent()
        .is('button'),
    ).toEqual(true);
  });

  it('renders an icon when given', () => {
    const wrapper = shallowWithStyles(
      <MessageItem {...props} imageSrc={undefined} icon={<IconCheck decorative />}>
        Hello world
      </MessageItem>,
    );

    expect(wrapper.find(IconCheck)).toHaveLength(1);
    expect(wrapper.find(ProfilePhoto)).toHaveLength(0);
  });

  it('renders a message item with `horizontalSpacing`', () => {
    const wrapper = shallowWithStyles(
      <MessageItem horizontalSpacing {...props}>
        Hello world
      </MessageItem>,
    );

    expect(wrapper.prop('className')).toMatch('container_horizontalSpacing');
  });

  it('renders a message item with `verticalSpacing`', () => {
    const wrapper = shallowWithStyles(
      <MessageItem verticalSpacing {...props}>
        Hello world
      </MessageItem>,
    );

    expect(wrapper.prop('className')).toMatch('container_verticalSpacing');
  });

  it('renders a message item with `important`', () => {
    const wrapper = shallowWithStyles(
      <MessageItem important {...props}>
        Hello world
      </MessageItem>,
    );

    expect(wrapper.prop('className')).toMatch('container_important');
  });

  it('renders a message item with `info` stripe', () => {
    const wrapper = shallowWithStyles(
      <MessageItem info {...props}>
        Hello world
      </MessageItem>,
    );

    expect(wrapper.prop('className')).toMatch('container_info');
  });

  it('renders a message item with `warning` stripe', () => {
    const wrapper = shallowWithStyles(
      <MessageItem warning {...props}>
        Hello world
      </MessageItem>,
    );

    expect(wrapper.prop('className')).toMatch('container_warning');
  });
});
