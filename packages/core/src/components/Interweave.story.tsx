import React from 'react';
import { storiesOf } from '@storybook/react';
import Text from './Text';
import Interweave from './Interweave';

storiesOf('Core/Interweave', module)
  .add('Render HTML without using .', () => (
    <Text>
      <Interweave content="This text <b>will be bold</b>. And this <a href='www.airbnb.com'>link will work</a>." />
    </Text>
  ))
  .add('Autolink URLs and emails.', () => (
    <Text>
      <Interweave content="This contains a URL, www.airbnb.com, and an email, noreply@airbnb.com." />
    </Text>
  ))
  .add('Specify size for Autolinked URLs and emails.', () => (
    <Text large>
      <Interweave
        content="This contains a URL, www.airbnb.com, and an email, noreply@airbnb.com."
        large
      />
    </Text>
  ))
  .add('Render emojis by converting unicode characters, shortcodes, and emoticons.', () => (
    <Text>
      <Interweave content="Character: 😽 Shortcode: :kissing_cat: Emoticon: :3" withEmoticons />
    </Text>
  ))
  .add('Supports long URLs.', () => (
    <Text>
      <Interweave content="This text <b>will be bold</b>. And this <a href='https://www.google.com/search?q=google+image+cats&tbm=isch&tbo=u&source=univ&sa=X&ved=2ahUKEwjDqIymvr3cAhWJllQKHV6iCZgQsAR6BAgAEAE&biw=1280&bih=1343'>https://www.google.com/search?q=google+image+cats&tbm=isch&tbo=u&source=univ&sa=X&ved=2ahUKEwjDqIymvr3cAhWJllQKHV6iCZgQsAR6BAgAEAE&biw=1280&bih=1343</a> will wrap." />
    </Text>
  ))
  .add("Doesn't break interpolations.", () => (
    <Text>
      <Interweave content="Hi {{user.first_name}}, this is {{me.name}}. How are you?" />
    </Text>
  ));
