import 'airbnb-js-shims';
import { stripHexcode } from 'emojibase';
import Lunar from '@airbnb/lunar/src'; // src required because of aliases
import { THEME } from './constants';

Lunar.initialize({
  name: 'Lunar',
  emojiCDN: (hexcode, large) =>
    `https://cdn.jsdelivr.net/gh/joypixels/emoji-assets@latest/png/${
      large ? 64 : 32
    }/${stripHexcode(hexcode).toLowerCase()}.png`,
  logger: console.log,
  theme: THEME,
});
