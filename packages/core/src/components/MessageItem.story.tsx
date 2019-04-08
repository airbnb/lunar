import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import IconBolt from '@airbnb/lunar-icons/lib/general/IconBolt';
import lunar from ':image/lunar-logo.png';
import Text from './Text';
import Interweave from './Interweave';
import MessageItem from './MessageItem';

storiesOf('Core/MessageItem', module)
  .add('Message item.', () => (
    <MessageItem
      formattedTimestamp="2:45 AM"
      imageDescription="Link"
      imageSrc={lunar}
      title="Lorem ipsum dolor sit amet"
    >
      <Text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam leo erat, lacinia nec porttitor
        sed, mollis sed nibh. Nam porta sit amet risus quis interdum. Sed feugiat lorem vitae augue
        blandit, sed mollis mi laoreet. Donec auctor, enim eget tempus auctor, est lorem laoreet
        nisi, a rutrum dolor quam eget mi. Integer nibh orci, faucibus in dolor ut, maximus euismod
        erat.
      </Text>
    </MessageItem>
  ))
  .add('With loading author.', () => (
    <MessageItem
      loadingAuthor
      formattedTimestamp="2:45 AM"
      imageDescription="Link"
      imageSrc={lunar}
      title="Lorem ipsum dolor sit amet"
    >
      <Text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam leo erat, lacinia nec porttitor
        sed, mollis sed nibh. Nam porta sit amet risus quis interdum. Sed feugiat lorem vitae augue
        blandit, sed mollis mi laoreet. Donec auctor, enim eget tempus auctor, est lorem laoreet
        nisi, a rutrum dolor quam eget mi. Integer nibh orci, faucibus in dolor ut, maximus euismod
        erat.
      </Text>
    </MessageItem>
  ))
  .add('With sending state.', () => (
    <MessageItem
      sending
      formattedTimestamp="2:45 AM"
      imageDescription="Link"
      imageSrc={lunar}
      title="Lorem ipsum dolor sit amet"
    >
      <Text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam leo erat, lacinia nec porttitor
        sed, mollis sed nibh. Nam porta sit amet risus quis interdum. Sed feugiat lorem vitae augue
        blandit, sed mollis mi laoreet. Donec auctor, enim eget tempus auctor, est lorem laoreet
        nisi, a rutrum dolor quam eget mi. Integer nibh orci, faucibus in dolor ut, maximus euismod
        erat.
      </Text>
    </MessageItem>
  ))
  .add('With a badge.', () => (
    <MessageItem
      formattedTimestamp="2:45 AM"
      imageDescription="Link"
      imageBadgeSrc={lunar}
      imageSrc={lunar}
      title="Lorem ipsum dolor sit amet"
    >
      <Text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam leo erat, lacinia nec porttitor
        sed, mollis sed nibh. Nam porta sit amet risus quis interdum. Sed feugiat lorem vitae augue
        blandit, sed mollis mi laoreet. Donec auctor, enim eget tempus auctor, est lorem laoreet
        nisi, a rutrum dolor quam eget mi. Integer nibh orci, faucibus in dolor ut, maximus euismod
        erat.
      </Text>
    </MessageItem>
  ))
  .add('With an icon avatar.', () => (
    <MessageItem
      formattedTimestamp="2:45 AM"
      icon={<IconBolt size="1.25em" />}
      imageDescription="Link"
      source="web"
      title="Lorem ipsum dolor sit amet"
    >
      <Text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam leo erat, lacinia nec porttitor
        sed, mollis sed nibh. Nam porta sit amet risus quis interdum. Sed feugiat lorem vitae augue
        blandit, sed mollis mi laoreet. Donec auctor, enim eget tempus auctor, est lorem laoreet
        nisi, a rutrum dolor quam eget mi. Integer nibh orci, faucibus in dolor ut, maximus euismod
        erat.
      </Text>
    </MessageItem>
  ))
  .add('With profile photo click.', () => (
    <MessageItem
      formattedTimestamp="2:45 AM"
      imageDescription="Link - Click to open Nova profile"
      imageSrc={lunar}
      onClickImage={() => alert('Profile photo clicked!')}
      title="Lorem ipsum dolor sit amet"
    >
      <Text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam leo erat, lacinia nec porttitor
        sed, mollis sed nibh. Nam porta sit amet risus quis interdum. Sed feugiat lorem vitae augue
        blandit, sed mollis mi laoreet. Donec auctor, enim eget tempus auctor, est lorem laoreet
        nisi, a rutrum dolor quam eget mi. Integer nibh orci, faucibus in dolor ut, maximus euismod
        erat.
      </Text>
    </MessageItem>
  ))
  .add('With a clickable title.', () => (
    <MessageItem
      formattedTimestamp="2:45 AM"
      imageDescription="Link"
      imageSrc={lunar}
      onClickTitle={() => alert('Title clicked!')}
      title="Lorem ipsum dolor sit amet"
      titleClickDescription="Real name: Link - Click to chat"
    >
      <Text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam leo erat, lacinia nec porttitor
        sed, mollis sed nibh. Nam porta sit amet risus quis interdum. Sed feugiat lorem vitae augue
        blandit, sed mollis mi laoreet. Donec auctor, enim eget tempus auctor, est lorem laoreet
        nisi, a rutrum dolor quam eget mi. Integer nibh orci, faucibus in dolor ut, maximus euismod
        erat.
      </Text>
    </MessageItem>
  ))
  .add('With an email.', () => (
    <MessageItem
      email="noreply@airbnb.com"
      formattedTimestamp="2:45 AM"
      imageDescription="Link"
      imageSrc={lunar}
      title="Lorem ipsum dolor sit amet"
    >
      <Text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam leo erat, lacinia nec porttitor
        sed, mollis sed nibh. Nam porta sit amet risus quis interdum. Sed feugiat lorem vitae augue
        blandit, sed mollis mi laoreet. Donec auctor, enim eget tempus auctor, est lorem laoreet
        nisi, a rutrum dolor quam eget mi. Integer nibh orci, faucibus in dolor ut, maximus euismod
        erat.
      </Text>
    </MessageItem>
  ))
  .add('With a source.', () => (
    <MessageItem
      formattedTimestamp="2:45 AM"
      imageDescription="Link"
      imageSrc={lunar}
      source="web"
      title="Lorem ipsum dolor sit amet"
    >
      <Text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam leo erat, lacinia nec porttitor
        sed, mollis sed nibh. Nam porta sit amet risus quis interdum. Sed feugiat lorem vitae augue
        blandit, sed mollis mi laoreet. Donec auctor, enim eget tempus auctor, est lorem laoreet
        nisi, a rutrum dolor quam eget mi. Integer nibh orci, faucibus in dolor ut, maximus euismod
        erat.
      </Text>
    </MessageItem>
  ))
  .add('With a title tag.', () => (
    <MessageItem
      formattedTimestamp="2:45 AM"
      imageDescription="Link"
      imageSrc={lunar}
      title="Lorem ipsum dolor sit amet"
      titleTag="CS"
    >
      <Text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam leo erat, lacinia nec porttitor
        sed, mollis sed nibh. Nam porta sit amet risus quis interdum. Sed feugiat lorem vitae augue
        blandit, sed mollis mi laoreet. Donec auctor, enim eget tempus auctor, est lorem laoreet
        nisi, a rutrum dolor quam eget mi. Integer nibh orci, faucibus in dolor ut, maximus euismod
        erat.
      </Text>
    </MessageItem>
  ))
  .add('With `Interweave`.', () => (
    <MessageItem
      formattedTimestamp="2:45 AM"
      imageDescription="Link"
      imageSrc={lunar}
      title="Lorem ipsum dolor sit amet"
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
      title="Lorem ipsum dolor sit amet"
      titleTag="CS"
    >
      <Text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam leo erat, lacinia nec porttitor
        sed, mollis sed nibh. Nam porta sit amet risus quis interdum. Sed feugiat lorem vitae augue
        blandit, sed mollis mi laoreet. Donec auctor, enim eget tempus auctor, est lorem laoreet
        nisi, a rutrum dolor quam eget mi. Integer nibh orci, faucibus in dolor ut, maximus euismod
        erat.
      </Text>
    </MessageItem>
  ))
  .add('With horizontal spacing.', () => (
    <MessageItem
      horizontalSpacing
      formattedTimestamp="2:45 AM"
      imageDescription="Link"
      imageSrc={lunar}
      title="Lorem ipsum dolor sit amet"
      titleTag="CS"
    >
      <Text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam leo erat, lacinia nec porttitor
        sed, mollis sed nibh. Nam porta sit amet risus quis interdum. Sed feugiat lorem vitae augue
        blandit, sed mollis mi laoreet. Donec auctor, enim eget tempus auctor, est lorem laoreet
        nisi, a rutrum dolor quam eget mi. Integer nibh orci, faucibus in dolor ut, maximus euismod
        erat.
      </Text>
    </MessageItem>
  ))
  .add('With important.', () => (
    <MessageItem
      important
      formattedTimestamp="2:45 AM"
      imageDescription="Link"
      imageSrc={lunar}
      title="Lorem ipsum dolor sit amet"
      titleTag="CS"
    >
      <Text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam leo erat, lacinia nec porttitor
        sed, mollis sed nibh. Nam porta sit amet risus quis interdum. Sed feugiat lorem vitae augue
        blandit, sed mollis mi laoreet. Donec auctor, enim eget tempus auctor, est lorem laoreet
        nisi, a rutrum dolor quam eget mi. Integer nibh orci, faucibus in dolor ut, maximus euismod
        erat.
      </Text>
    </MessageItem>
  ))
  .add('With warning.', () => (
    <MessageItem
      warning
      formattedTimestamp="2:45 AM"
      imageDescription="Link"
      imageSrc={lunar}
      title="Lorem ipsum dolor sit amet"
      titleTag="CS"
    >
      <Text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam leo erat, lacinia nec porttitor
        sed, mollis sed nibh. Nam porta sit amet risus quis interdum. Sed feugiat lorem vitae augue
        blandit, sed mollis mi laoreet. Donec auctor, enim eget tempus auctor, est lorem laoreet
        nisi, a rutrum dolor quam eget mi. Integer nibh orci, faucibus in dolor ut, maximus euismod
        erat.
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
      title="Lorem ipsum dolor sit amet"
    >
      <Text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam leo erat, lacinia nec porttitor
        sed, mollis sed nibh. Nam porta sit amet risus quis interdum. Sed feugiat lorem vitae augue
        blandit, sed mollis mi laoreet. Donec auctor, enim eget tempus auctor, est lorem laoreet
        nisi, a rutrum dolor quam eget mi. Integer nibh orci, faucibus in dolor ut, maximus euismod
        erat.
      </Text>
    </MessageItem>
  ));
