import React from 'react';
import { action } from '@storybook/addon-actions';
import IconBolt from '@airbnb/lunar-icons/lib/general/IconBolt';
import LoremIpsum from ':storybook/components/LoremIpsum';
import lunar from ':storybook/images/lunar-logo.png';
import Text from '../Text';
import Interweave from '../Interweave';
import MessageItem from '.';

export default {
  title: 'Core/MessageItem',
  parameters: {
    inspectComponents: [MessageItem],
  },
};

export function messageItem() {
  return (
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
  );
}

messageItem.story = {
  name: 'Message item.',
};

export function withLoadingAuthor() {
  return (
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
  );
}

withLoadingAuthor.story = {
  name: 'With loading author.',
};

export function withSendingState() {
  return (
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
  );
}

withSendingState.story = {
  name: 'With sending state.',
};

export function withABadge() {
  return (
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
  );
}

withABadge.story = {
  name: 'With a badge.',
};

export function withAnIconAvatar() {
  return (
    <MessageItem
      formattedTimestamp="2:45 AM"
      icon={<IconBolt decorative size="1.25em" />}
      imageDescription="Link"
      source="web"
      title="Some custom title"
    >
      <Text>
        <LoremIpsum />
      </Text>
    </MessageItem>
  );
}

withAnIconAvatar.story = {
  name: 'With an icon avatar.',
};

export function withProfilePhotoClick() {
  return (
    <MessageItem
      formattedTimestamp="2:45 AM"
      imageDescription="Link - Click to open Nova profile"
      imageSrc={lunar}
      title="Some custom title"
      onClickImage={action('onClickImage')}
    >
      <Text>
        <LoremIpsum />
      </Text>
    </MessageItem>
  );
}

withProfilePhotoClick.story = {
  name: 'With profile photo click.',
};

export function withAClickableTitle() {
  return (
    <MessageItem
      formattedTimestamp="2:45 AM"
      imageDescription="Link"
      imageSrc={lunar}
      title="Some custom title"
      titleClickDescription="Real name: Link - Click to chat"
      onClickTitle={action('onClickTitle')}
    >
      <Text>
        <LoremIpsum />
      </Text>
    </MessageItem>
  );
}

withAClickableTitle.story = {
  name: 'With a clickable title.',
};

export function withAnEmail() {
  return (
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
  );
}

withAnEmail.story = {
  name: 'With an email.',
};

export function withASource() {
  return (
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
  );
}

withASource.story = {
  name: 'With a source.',
};

export function withATitleTag() {
  return (
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
  );
}

withATitleTag.story = {
  name: 'With a title tag.',
};

export function withInterweave() {
  return (
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
  );
}

withInterweave.story = {
  name: 'With `Interweave`.',
};

export function withVerticalSpacing() {
  return (
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
  );
}

withVerticalSpacing.story = {
  name: 'With vertical spacing.',
};

export function withHorizontalSpacing() {
  return (
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
  );
}

withHorizontalSpacing.story = {
  name: 'With horizontal spacing.',
};

export function withImportant() {
  return (
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
  );
}

withImportant.story = {
  name: 'With important.',
};

export function withWarning() {
  return (
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
  );
}

withWarning.story = {
  name: 'With warning.',
};

export function withInfo() {
  return (
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
  );
}

withInfo.story = {
  name: 'With info.',
};

export function withDisableTitleTranslation() {
  return (
    <MessageItem
      disableTitleTranslation
      formattedTimestamp="2:45 AM"
      imageDescription="Link"
      imageSrc={lunar}
      title="Some custom title"
    >
      <Text>
        <LoremIpsum />
      </Text>
    </MessageItem>
  );
}

withDisableTitleTranslation.story = {
  name: 'With disable title translation.',
};
