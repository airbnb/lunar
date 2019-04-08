import React from 'react';
import { addDecorator, addParameters, configure } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';
import Lunar from '@airbnb/lunar';
import lightTheme from '@airbnb/lunar/lib/themes/light';
import darkTheme from '@airbnb/lunar/lib/themes/dark';
import createTheme from './addons/themes/createTheme';

const themes = {
  light: lightTheme,
  dark: darkTheme,
};

let theme = localStorage.getItem('storybook.theme');

if (!theme || (theme !== 'light' && theme !== 'dark')) {
  theme = 'light';
}

Lunar.initialize({
  name: 'Lunar',
  emojiCDN: hexcode =>
    `https://cdnjs.cloudflare.com/ajax/libs/emojione/2.2.7/assets/png/${hexcode.toLowerCase()}.png`,
  logger: console.log,
  theme,
});

addDecorator(withA11y);

addDecorator(story => (
  <div style={{ padding: 20, fontSize: 15, fontFamily: Lunar.settings.fontFamily }}>{story()}</div>
));

addParameters({
  options: {
    name: 'Lunar',
    theme: createTheme(theme, themes[theme](), Lunar.settings.fontFamily),
  },
  backgrounds: [{ name: 'White', value: '#fff' }, { name: 'Black', value: '#000' }],
});

configure(() => {
  const glob = require.context('../packages', true, /\.story\.tsx?$/);

  glob.keys().forEach(filename => glob(filename));
}, module);
