Render HTML without using `dangerouslySetInnerHTML`.

```jsx
import Text from '../Text';

<Text>
  <Interweave content="This text <b>will be bold</b>. And this <a href='www.airbnb.com'>link will work</a>." />
</Text>;
```

Autolink URLs and emails.

```jsx
import Text from '../Text';

<Text>
  <Interweave content="This contains a URL, www.airbnb.com, and an email, noreply@airbnb.com." />
</Text>;
```

Specify size for Autolinked URLs and emails.

```jsx
import Text from '../Text';

<Text large>
  <Interweave
    content="This contains a URL, www.airbnb.com, and an email, noreply@airbnb.com."
    large
  />
</Text>;
```

Render emojis by converting unicode characters, shortcodes, and emoticons.

```jsx
import Text from '../Text';

<Text>
  <Interweave content="Character: 😽 Shortcode: :kissing_cat: Emoticon: :3" withEmoticons />
</Text>;
```

Supports long URLs.

```jsx
import Text from '../Text';

<Text>
  <Interweave content="This text <b>will be bold</b>. And this <a href='https://www.google.com/search?q=google+image+cats&tbm=isch&tbo=u&source=univ&sa=X&ved=2ahUKEwjDqIymvr3cAhWJllQKHV6iCZgQsAR6BAgAEAE&biw=1280&bih=1343'>https://www.google.com/search?q=google+image+cats&tbm=isch&tbo=u&source=univ&sa=X&ved=2ahUKEwjDqIymvr3cAhWJllQKHV6iCZgQsAR6BAgAEAE&biw=1280&bih=1343</a> will wrap." />
</Text>;
```

Doesn't break interpolations.

```jsx
import Text from '../Text';

<Text>
  <Interweave content="Hi {{user.first_name}}, this is {{me.name}}. How are you?" />
</Text>;
```
