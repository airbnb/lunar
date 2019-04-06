import { addDecorator, addParameters, configure } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';
import { withInfo } from '@storybook/addon-info';
import Lunar from '@airbnb/lunar';
import Spacing from '@airbnb/lunar/lib/components/Spacing';

Lunar.initialize({
  name: 'Lunar',
  emojiCDN: hexcode =>
    `https://cdnjs.cloudflare.com/ajax/libs/emojione/2.2.7/assets/png/${hexcode.toLowerCase()}.png`,
  logger: console.log,
});

addDecorator(withA11y);

addDecorator(withInfo);

addDecorator(story => <Spacing all={2}>{story()}</Spacing>);

addParameters({
  options: {
    name: 'Lunar',
  },
  backgrounds: [
    { name: 'Transparent', value: 'transparent', default: true },
    { name: 'White', value: '#fff' },
    { name: 'Black', value: '#000' },
  ],
});

configure(() => {
  const glob = require.context('../packages', true, /\.story\.tsx?$/);

  glob.keys().forEach(filename => glob(filename));
}, module);
