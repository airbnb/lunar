import 'airbnb-js-shims';
import { stripHexcode } from 'emojibase';
import Lunar from '@airbnb/lunar';
import { THEME } from './constants';

Lunar.initialize({
  name: 'Lunar',
  emojiCDN: (hexcode, large) =>
    `https://cdn.jsdelivr.net/emojione/assets/4.5/png/${large ? 64 : 32}/${stripHexcode(
      hexcode,
    ).toLowerCase()}.png`,
  logger: console.log,
  theme: THEME,
});
