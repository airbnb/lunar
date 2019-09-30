import React from 'react';
import Text from '../Text';
import Interweave from '.';

export default {
  title: 'Core/Interweave',
  parameters: {
    inspectComponents: [Interweave],
  },
};

export function renderHtmlWithoutUsing() {
  return (
    <Text>
      <Interweave content="This text <b>will be bold</b>. And this <a href='www.airbnb.com'>link will work</a>." />
    </Text>
  );
}

renderHtmlWithoutUsing.story = {
  name: 'Render HTML without using .',
};

export function autolinkUrLsAndEmails() {
  return (
    <Text>
      <Interweave content="This contains a URL, www.airbnb.com, and an email, noreply@airbnb.com." />
    </Text>
  );
}

autolinkUrLsAndEmails.story = {
  name: 'Autolink URLs and emails.',
};

export function specifySizeForAutolinkedUrLsAndEmails() {
  return (
    <Text large>
      <Interweave
        large
        content="This contains a URL, www.airbnb.com, and an email, noreply@airbnb.com."
      />
    </Text>
  );
}

specifySizeForAutolinkedUrLsAndEmails.story = {
  name: 'Specify size for Autolinked URLs and emails.',
};

export function renderEmojisByConvertingUnicodeCharactersShortcodesAndEmoticons() {
  return (
    <Text>
      <Interweave withEmoticons content="Character: 😽 Shortcode: :kissing_cat: Emoticon: :3" />
    </Text>
  );
}

renderEmojisByConvertingUnicodeCharactersShortcodesAndEmoticons.story = {
  name: 'Render emojis by converting unicode characters, shortcodes, and emoticons.',
};

export function supportsLongUrLs() {
  return (
    <Text>
      <Interweave content="This text <b>will be bold</b>. And this <a href='https://www.google.com/search?q=google+image+cats&tbm=isch&tbo=u&source=univ&sa=X&ved=2ahUKEwjDqIymvr3cAhWJllQKHV6iCZgQsAR6BAgAEAE&biw=1280&bih=1343'>https://www.google.com/search?q=google+image+cats&tbm=isch&tbo=u&source=univ&sa=X&ved=2ahUKEwjDqIymvr3cAhWJllQKHV6iCZgQsAR6BAgAEAE&biw=1280&bih=1343</a> will wrap." />
    </Text>
  );
}

supportsLongUrLs.story = {
  name: 'Supports long URLs.',
};

export function doesntBreakInterpolations() {
  return (
    <Text>
      <Interweave content="Hi {{user.first_name}}, this is {{me.name}}. How are you?" />
    </Text>
  );
}

doesntBreakInterpolations.story = {
  name: "Doesn't break interpolations.",
};
