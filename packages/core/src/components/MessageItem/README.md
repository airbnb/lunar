Message item.

```jsx
import Text from '../Text';

<MessageItem
  formattedTimestamp="2:45 AM"
  imageDescription="Link"
  imageSrc={window.images.lunar}
  title="Lorem ipsum dolor sit amet"
>
  <Text>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam leo erat, lacinia nec porttitor
    sed, mollis sed nibh. Nam porta sit amet risus quis interdum. Sed feugiat lorem vitae augue
    blandit, sed mollis mi laoreet. Donec auctor, enim eget tempus auctor, est lorem laoreet nisi, a
    rutrum dolor quam eget mi. Integer nibh orci, faucibus in dolor ut, maximus euismod erat.
  </Text>
</MessageItem>;
```

With loading author.

```jsx
import Text from '../Text';

<MessageItem
  loadingAuthor
  formattedTimestamp="2:45 AM"
  imageDescription="Link"
  imageSrc={window.images.lunar}
  title="Lorem ipsum dolor sit amet"
>
  <Text>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam leo erat, lacinia nec porttitor
    sed, mollis sed nibh. Nam porta sit amet risus quis interdum. Sed feugiat lorem vitae augue
    blandit, sed mollis mi laoreet. Donec auctor, enim eget tempus auctor, est lorem laoreet nisi, a
    rutrum dolor quam eget mi. Integer nibh orci, faucibus in dolor ut, maximus euismod erat.
  </Text>
</MessageItem>;
```

With sending state.

```jsx
import Text from '../Text';

<MessageItem
  sending
  formattedTimestamp="2:45 AM"
  imageDescription="Link"
  imageSrc={window.images.lunar}
  title="Lorem ipsum dolor sit amet"
>
  <Text>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam leo erat, lacinia nec porttitor
    sed, mollis sed nibh. Nam porta sit amet risus quis interdum. Sed feugiat lorem vitae augue
    blandit, sed mollis mi laoreet. Donec auctor, enim eget tempus auctor, est lorem laoreet nisi, a
    rutrum dolor quam eget mi. Integer nibh orci, faucibus in dolor ut, maximus euismod erat.
  </Text>
</MessageItem>;
```

With a badge.

```jsx
import Text from '../Text';

<MessageItem
  formattedTimestamp="2:45 AM"
  imageDescription="Link"
  imageBadgeSrc={window.images.lunar}
  imageSrc={window.images.lunar}
  title="Lorem ipsum dolor sit amet"
>
  <Text>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam leo erat, lacinia nec porttitor
    sed, mollis sed nibh. Nam porta sit amet risus quis interdum. Sed feugiat lorem vitae augue
    blandit, sed mollis mi laoreet. Donec auctor, enim eget tempus auctor, est lorem laoreet nisi, a
    rutrum dolor quam eget mi. Integer nibh orci, faucibus in dolor ut, maximus euismod erat.
  </Text>
</MessageItem>;
```

With an icon avatar.

```jsx
import IconBolt from ':icons/general/IconBolt';
import Text from '../Text';

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
    blandit, sed mollis mi laoreet. Donec auctor, enim eget tempus auctor, est lorem laoreet nisi, a
    rutrum dolor quam eget mi. Integer nibh orci, faucibus in dolor ut, maximus euismod erat.
  </Text>
</MessageItem>;
```

With profile photo click.

```jsx
import Text from '../Text';

<MessageItem
  formattedTimestamp="2:45 AM"
  imageDescription="Link - Click to open Nova profile"
  imageSrc={window.images.lunar}
  onClickImage={() => alert('Profile photo clicked!')}
  title="Lorem ipsum dolor sit amet"
>
  <Text>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam leo erat, lacinia nec porttitor
    sed, mollis sed nibh. Nam porta sit amet risus quis interdum. Sed feugiat lorem vitae augue
    blandit, sed mollis mi laoreet. Donec auctor, enim eget tempus auctor, est lorem laoreet nisi, a
    rutrum dolor quam eget mi. Integer nibh orci, faucibus in dolor ut, maximus euismod erat.
  </Text>
</MessageItem>;
```

With a clickable title.

```jsx
import Text from '../Text';

<MessageItem
  formattedTimestamp="2:45 AM"
  imageDescription="Link"
  imageSrc={window.images.lunar}
  onClickTitle={() => alert('Title clicked!')}
  title="Lorem ipsum dolor sit amet"
  titleClickDescription="Real name: Link - Click to chat"
>
  <Text>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam leo erat, lacinia nec porttitor
    sed, mollis sed nibh. Nam porta sit amet risus quis interdum. Sed feugiat lorem vitae augue
    blandit, sed mollis mi laoreet. Donec auctor, enim eget tempus auctor, est lorem laoreet nisi, a
    rutrum dolor quam eget mi. Integer nibh orci, faucibus in dolor ut, maximus euismod erat.
  </Text>
</MessageItem>;
```

With an email.

```jsx
import Text from '../Text';

<MessageItem
  email="noreply@airbnb.com"
  formattedTimestamp="2:45 AM"
  imageDescription="Link"
  imageSrc={window.images.lunar}
  title="Lorem ipsum dolor sit amet"
>
  <Text>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam leo erat, lacinia nec porttitor
    sed, mollis sed nibh. Nam porta sit amet risus quis interdum. Sed feugiat lorem vitae augue
    blandit, sed mollis mi laoreet. Donec auctor, enim eget tempus auctor, est lorem laoreet nisi, a
    rutrum dolor quam eget mi. Integer nibh orci, faucibus in dolor ut, maximus euismod erat.
  </Text>
</MessageItem>;
```

With a source.

```jsx
import Text from '../Text';

<MessageItem
  formattedTimestamp="2:45 AM"
  imageDescription="Link"
  imageSrc={window.images.lunar}
  source="web"
  title="Lorem ipsum dolor sit amet"
>
  <Text>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam leo erat, lacinia nec porttitor
    sed, mollis sed nibh. Nam porta sit amet risus quis interdum. Sed feugiat lorem vitae augue
    blandit, sed mollis mi laoreet. Donec auctor, enim eget tempus auctor, est lorem laoreet nisi, a
    rutrum dolor quam eget mi. Integer nibh orci, faucibus in dolor ut, maximus euismod erat.
  </Text>
</MessageItem>;
```

With a title tag.

```jsx
import Text from '../Text';

<MessageItem
  formattedTimestamp="2:45 AM"
  imageDescription="Link"
  imageSrc={window.images.lunar}
  title="Lorem ipsum dolor sit amet"
  titleTag="CS"
>
  <Text>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam leo erat, lacinia nec porttitor
    sed, mollis sed nibh. Nam porta sit amet risus quis interdum. Sed feugiat lorem vitae augue
    blandit, sed mollis mi laoreet. Donec auctor, enim eget tempus auctor, est lorem laoreet nisi, a
    rutrum dolor quam eget mi. Integer nibh orci, faucibus in dolor ut, maximus euismod erat.
  </Text>
</MessageItem>;
```

With `<Interweave>`.

```jsx
import Interweave from '../Interweave';
import Text from '../Text';

<MessageItem
  formattedTimestamp="2:45 AM"
  imageDescription="Link"
  imageSrc={window.images.lunar}
  title="Lorem ipsum dolor sit amet"
  titleTag="CS"
>
  <Text>
    <Interweave content="This text <b>will be bold</b>. And this <a href='https://www.google.com/search?q=google+image+cats&tbm=isch&tbo=u&source=univ&sa=X&ved=2ahUKEwjDqIymvr3cAhWJllQKHV6iCZgQsAR6BAgAEAE&biw=1280&bih=1343'>https://www.google.com/search?q=google+image+cats&tbm=isch&tbo=u&source=univ&sa=X&ved=2ahUKEwjDqIymvr3cAhWJllQKHV6iCZgQsAR6BAgAEAE&biw=1280&bih=1343</a> will wrap." />
  </Text>
</MessageItem>;
```

With vertical spacing (recommended if using along side any striped messages).

```jsx
import Text from '../Text';

<MessageItem
  verticalSpacing
  formattedTimestamp="2:45 AM"
  imageDescription="Link"
  imageSrc={window.images.lunar}
  title="Lorem ipsum dolor sit amet"
  titleTag="CS"
>
  <Text>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam leo erat, lacinia nec porttitor
    sed, mollis sed nibh. Nam porta sit amet risus quis interdum. Sed feugiat lorem vitae augue
    blandit, sed mollis mi laoreet. Donec auctor, enim eget tempus auctor, est lorem laoreet nisi, a
    rutrum dolor quam eget mi. Integer nibh orci, faucibus in dolor ut, maximus euismod erat.
  </Text>
</MessageItem>;
```

With horizontal spacing (recommended if using along side any striped messages).

```jsx
import Text from '../Text';

<MessageItem
  horizontalSpacing
  formattedTimestamp="2:45 AM"
  imageDescription="Link"
  imageSrc={window.images.lunar}
  title="Lorem ipsum dolor sit amet"
  titleTag="CS"
>
  <Text>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam leo erat, lacinia nec porttitor
    sed, mollis sed nibh. Nam porta sit amet risus quis interdum. Sed feugiat lorem vitae augue
    blandit, sed mollis mi laoreet. Donec auctor, enim eget tempus auctor, est lorem laoreet nisi, a
    rutrum dolor quam eget mi. Integer nibh orci, faucibus in dolor ut, maximus euismod erat.
  </Text>
</MessageItem>;
```

With important.

```jsx
import Text from '../Text';

<MessageItem
  important
  formattedTimestamp="2:45 AM"
  imageDescription="Link"
  imageSrc={window.images.lunar}
  title="Lorem ipsum dolor sit amet"
  titleTag="CS"
>
  <Text>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam leo erat, lacinia nec porttitor
    sed, mollis sed nibh. Nam porta sit amet risus quis interdum. Sed feugiat lorem vitae augue
    blandit, sed mollis mi laoreet. Donec auctor, enim eget tempus auctor, est lorem laoreet nisi, a
    rutrum dolor quam eget mi. Integer nibh orci, faucibus in dolor ut, maximus euismod erat.
  </Text>
</MessageItem>;
```

With warning.

```jsx
import Text from '../Text';

<MessageItem
  warning
  formattedTimestamp="2:45 AM"
  imageDescription="Link"
  imageSrc={window.images.lunar}
  title="Lorem ipsum dolor sit amet"
  titleTag="CS"
>
  <Text>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam leo erat, lacinia nec porttitor
    sed, mollis sed nibh. Nam porta sit amet risus quis interdum. Sed feugiat lorem vitae augue
    blandit, sed mollis mi laoreet. Donec auctor, enim eget tempus auctor, est lorem laoreet nisi, a
    rutrum dolor quam eget mi. Integer nibh orci, faucibus in dolor ut, maximus euismod erat.
  </Text>
</MessageItem>;
```

With info.

```jsx
import Text from '../Text';

<MessageItem
  info
  email="noreply@airbnb.com"
  formattedTimestamp="2:45 AM"
  imageDescription="Link"
  imageSrc={window.images.lunar}
  title="Lorem ipsum dolor sit amet"
>
  <Text>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam leo erat, lacinia nec porttitor
    sed, mollis sed nibh. Nam porta sit amet risus quis interdum. Sed feugiat lorem vitae augue
    blandit, sed mollis mi laoreet. Donec auctor, enim eget tempus auctor, est lorem laoreet nisi, a
    rutrum dolor quam eget mi. Integer nibh orci, faucibus in dolor ut, maximus euismod erat.
  </Text>
</MessageItem>;
```
