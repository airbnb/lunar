import Lunar from '@airbnb/lunar';
import moon from './images/moon.jpg';
import stars from './images/stars.jpg';
import lunar from './images/lunar.png';

global.log = (...args) => console.log(...args);
global.debug = key => (...args) => console.log(key, ...args);
global.images = { moon, stars, lunar };

Lunar.initialize({
  emojiCDN: hexcode =>
    `https://cdnjs.cloudflare.com/ajax/libs/emojione/2.2.7/assets/png/${hexcode.toLowerCase()}.png`,
  logger: global.log,
});
