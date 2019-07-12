import React from 'react';
import { shallowWithStyles } from '@airbnb/lunar-test-utils';
import MessageItem from '../../src/components/MessageItem';
import IconCheck from '../../../icons/src/interface/IconCheck';
import ProfilePhoto from '../../src/components/ProfilePhoto';
import Text from '../../src/components/Text';

describe('<MessageItem>', () => {
  it('renders a message item', () => {
    const url = 'https://image.com';
    const timestamp = '11:56 AM';
    const title = 'title';

    const wrapper = shallowWithStyles(
      <MessageItem formattedTimestamp={timestamp} imageSrc={url} title={title}>
        Hello world
      </MessageItem>,
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('renders a loading author', () => {
    const url = 'https://image.com';
    const timestamp = '11:56 AM';
    const title = 'title';

    const wrapper = shallowWithStyles(
      <MessageItem loadingAuthor formattedTimestamp={timestamp} imageSrc={url} title={title}>
        Hello world
      </MessageItem>,
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('renders a sending overlay when message is sending', () => {
    const url = 'https://image.com';
    const timestamp = '11:56 AM';
    const title = 'title';

    const wrapper = shallowWithStyles(
      <MessageItem sending formattedTimestamp={timestamp} imageSrc={url} title={title}>
        Hello world
      </MessageItem>,
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('renders an email when given', () => {
    const url = 'https://image.com';
    const timestamp = '11:56 AM';
    const title = 'title';

    const wrapper = shallowWithStyles(
      <MessageItem
        email="foo@airbnb.com"
        formattedTimestamp={timestamp}
        imageSrc={url}
        title={title}
      >
        Hello world
      </MessageItem>,
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('renders a source when given', () => {
    const url = 'https://image.com';
    const timestamp = '11:56 AM';
    const title = 'title';

    const wrapper = shallowWithStyles(
      <MessageItem formattedTimestamp={timestamp} imageSrc={url} title={title} source="web">
        Hello world
      </MessageItem>,
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('renders a title tag when given', () => {
    const url = 'https://image.com';
    const timestamp = '11:56 AM';
    const title = 'title';
    const titleTag = 'CX';

    const wrapper = shallowWithStyles(
      <MessageItem formattedTimestamp={timestamp} imageSrc={url} title={title} titleTag={titleTag}>
        Hello world
      </MessageItem>,
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('renders the title with a `button` when `onClickTitle` is true', () => {
    const url = 'https://image.com';
    const timestamp = '11:56 AM';
    const title = 'title';
    const onClickTitle = () => {};

    const wrapper = shallowWithStyles(
      <MessageItem
        formattedTimestamp={timestamp}
        imageSrc={url}
        title={title}
        onClickTitle={onClickTitle}
      >
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
    const url = 'https://image.com';
    const timestamp = '11:56 AM';
    const title = 'title';
    const onClickImage = () => {};

    const wrapper = shallowWithStyles(
      <MessageItem
        formattedTimestamp={timestamp}
        imageSrc={url}
        title={title}
        onClickImage={onClickImage}
      >
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
    const timestamp = '11:56 AM';
    const title = 'title';
    const wrapper = shallowWithStyles(
      <MessageItem formattedTimestamp={timestamp} title={title} icon={<IconCheck decorative />}>
        Hello world
      </MessageItem>,
    );

    expect(wrapper.find(IconCheck)).toHaveLength(1);
    expect(wrapper.find(ProfilePhoto)).toHaveLength(0);
  });

  it('renders a message item with `horizontalSpacing`', () => {
    const url = 'https://image.com';
    const timestamp = '11:56 AM';
    const title = 'title';

    const wrapper = shallowWithStyles(
      <MessageItem horizontalSpacing formattedTimestamp={timestamp} imageSrc={url} title={title}>
        Hello world
      </MessageItem>,
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('renders a message item with `verticalSpacing`', () => {
    const url = 'https://image.com';
    const timestamp = '11:56 AM';
    const title = 'title';

    const wrapper = shallowWithStyles(
      <MessageItem verticalSpacing formattedTimestamp={timestamp} imageSrc={url} title={title}>
        Hello world
      </MessageItem>,
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('renders a message item with `important`', () => {
    const url = 'https://image.com';
    const timestamp = '11:56 AM';
    const title = 'title';

    const wrapper = shallowWithStyles(
      <MessageItem important formattedTimestamp={timestamp} imageSrc={url} title={title}>
        Hello world
      </MessageItem>,
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('renders a message item with `info` stripe', () => {
    const url = 'https://image.com';
    const timestamp = '11:56 AM';
    const title = 'title';

    const wrapper = shallowWithStyles(
      <MessageItem info formattedTimestamp={timestamp} imageSrc={url} title={title}>
        Hello world
      </MessageItem>,
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('renders a message item with `warning` stripe', () => {
    const url = 'https://image.com';
    const timestamp = '11:56 AM';
    const title = 'title';

    const wrapper = shallowWithStyles(
      <MessageItem warning formattedTimestamp={timestamp} imageSrc={url} title={title}>
        Hello world
      </MessageItem>,
    );

    expect(wrapper).toMatchSnapshot();
  });
});
