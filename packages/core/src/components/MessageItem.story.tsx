import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import IconBolt from '@airbnb/lunar-icons/lib/general/IconBolt';
import LoremIpsum from ':storybook/components/LoremIpsum';
import lunar from ':storybook/images/lunar-logo.png';
import Text from './Text';
import Interweave from './Interweave';
import MessageItem from './MessageItem';

storiesOf('Core/MessageItem', module)
  .add('Message item.', () => (
    <MessageItem
      formattedTimestamp="2:45 AM"
      imageDescription="Link"
      imageSrc={lunar}
      title="Some custom title"
    >
      <Text>
        <LoremIpsum />
      </Text>
    </MessageItem>
  ))
  .add('With loading author.', () => (
    <MessageItem
      loadingAuthor
      formattedTimestamp="2:45 AM"
      imageDescription="Link"
      imageSrc={lunar}
      title="Some custom title"
    >
      <Text>
        <LoremIpsum />
      </Text>
    </MessageItem>
  ))
  .add('With sending state.', () => (
    <MessageItem
      sending
      formattedTimestamp="2:45 AM"
      imageDescription="Link"
      imageSrc={lunar}
      title="Some custom title"
    >
      <Text>
        <LoremIpsum />
      </Text>
    </MessageItem>
  ))
  .add('With a badge.', () => (
    <MessageItem
      formattedTimestamp="2:45 AM"
      imageDescription="Link"
      imageBadgeSrc={lunar}
      imageSrc={lunar}
      title="Some custom title"
    >
      <Text>
        <LoremIpsum />
      </Text>
    </MessageItem>
  ))
  .add('With an icon avatar.', () => (
    <MessageItem
      formattedTimestamp="2:45 AM"
      icon={<IconBolt size="1.25em" />}
      imageDescription="Link"
      source="web"
      title="Some custom title"
    >
      <Text>
        <LoremIpsum />
      </Text>
    </MessageItem>
  ))
  .add('With profile photo click.', () => (
    <MessageItem
      formattedTimestamp="2:45 AM"
      imageDescription="Link - Click to open Nova profile"
      imageSrc={lunar}
      onClickImage={action('onClickImage')}
      title="Some custom title"
    >
      <Text>
        <LoremIpsum />
      </Text>
    </MessageItem>
  ))
  .add('With a clickable title.', () => (
    <MessageItem
      formattedTimestamp="2:45 AM"
      imageDescription="Link"
      imageSrc={lunar}
      onClickTitle={action('onClickTitle')}
      title="Some custom title"
      titleClickDescription="Real name: Link - Click to chat"
    >
      <Text>
        <LoremIpsum />
      </Text>
    </MessageItem>
  ))
  .add('With an email.', () => (
    <MessageItem
      email="noreply@airbnb.com"
      formattedTimestamp="2:45 AM"
      imageDescription="Link"
      imageSrc={lunar}
      title="Some custom title"
    >
      <Text>
        <LoremIpsum />
      </Text>
    </MessageItem>
  ))
  .add('With a source.', () => (
    <MessageItem
      formattedTimestamp="2:45 AM"
      imageDescription="Link"
      imageSrc={lunar}
      source="web"
      title="Some custom title"
    >
      <Text>
        <LoremIpsum />
      </Text>
    </MessageItem>
  ))
  .add('With a title tag.', () => (
    <MessageItem
      formattedTimestamp="2:45 AM"
      imageDescription="Link"
      imageSrc={lunar}
      title="Some custom title"
      titleTag="CS"
    >
      <Text>
        <LoremIpsum />
      </Text>
    </MessageItem>
  ))
  .add('With `Interweave`.', () => (
    <MessageItem
      formattedTimestamp="2:45 AM"
      imageDescription="Link"
      imageSrc={lunar}
      title="Some custom title"
      titleTag="CS"
    >
      <Text>
        <Interweave content="This text <b>will be bold</b>. And this <a href='https://www.google.com/search?q=google+image+cats&tbm=isch&tbo=u&source=univ&sa=X&ved=2ahUKEwjDqIymvr3cAhWJllQKHV6iCZgQsAR6BAgAEAE&biw=1280&bih=1343'>https://www.google.com/search?q=google+image+cats&tbm=isch&tbo=u&source=univ&sa=X&ved=2ahUKEwjDqIymvr3cAhWJllQKHV6iCZgQsAR6BAgAEAE&biw=1280&bih=1343</a> will wrap." />
      </Text>
    </MessageItem>
  ))
  .add('With vertical spacing.', () => (
    <MessageItem
      verticalSpacing
      formattedTimestamp="2:45 AM"
      imageDescription="Link"
      imageSrc={lunar}
      title="Some custom title"
      titleTag="CS"
    >
      <Text>
        <LoremIpsum />
      </Text>
    </MessageItem>
  ))
  .add('With horizontal spacing.', () => (
    <MessageItem
      horizontalSpacing
      formattedTimestamp="2:45 AM"
      imageDescription="Link"
      imageSrc={lunar}
      title="Some custom title"
      titleTag="CS"
    >
      <Text>
        <LoremIpsum />
      </Text>
    </MessageItem>
  ))
  .add('With important.', () => (
    <MessageItem
      important
      formattedTimestamp="2:45 AM"
      imageDescription="Link"
      imageSrc={lunar}
      title="Some custom title"
      titleTag="CS"
    >
      <Text>
        <LoremIpsum />
      </Text>
    </MessageItem>
  ))
  .add('With warning.', () => (
    <MessageItem
      warning
      formattedTimestamp="2:45 AM"
      imageDescription="Link"
      imageSrc={lunar}
      title="Some custom title"
      titleTag="CS"
    >
      <Text>
        <LoremIpsum />
      </Text>
    </MessageItem>
  ))
  .add('With info.', () => (
    <MessageItem
      info
      email="noreply@airbnb.com"
      formattedTimestamp="2:45 AM"
      imageDescription="Link"
      imageSrc={lunar}
      title="Some custom title"
    >
      <Text>
        <LoremIpsum />
      </Text>
    </MessageItem>
  ));
