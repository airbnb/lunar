import 'airbnb-js-shims';
import React from 'react';
import { stripHexcode } from 'emojibase';
import { addDecorator, addParameters, configure } from '@storybook/react';
import { withContexts } from '@storybook/addon-contexts/react';
import { withA11y } from '@storybook/addon-a11y';
import Lunar from '@airbnb/lunar';
import { withProps } from './addons/props';
import { withStory } from './addons/story';
import contexts from './contexts';

Lunar.initialize({
  name: 'Lunar',
  emojiCDN: (hexcode, large) =>
    `https://cdn.jsdelivr.net/emojione/assets/4.5/png/${large ? 64 : 32}/${stripHexcode(
      hexcode,
    ).toLowerCase()}.png`,
  logger: console.log,
  theme: 'light',
});

addDecorator(withA11y);
addDecorator(withProps);
addDecorator(withStory);
addDecorator(withContexts(contexts));
addDecorator(story => (
  <div style={{ padding: 20, fontSize: 15, fontFamily: Lunar.settings.fontFamily }}>{story()}</div>
));

addParameters({
  backgrounds: [{ name: 'White', value: '#fff' }, { name: 'Black', value: '#000' }],
});

configure(() => {
  const glob = require.context('../packages', true, /\.story\.tsx?$/);

  glob.keys().forEach(filename => glob(filename));
}, module);
