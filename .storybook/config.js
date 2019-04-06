import { addDecorator, addParameters, configure } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';
import { withInfo } from '@storybook/addon-info';
import Lunar from '@airbnb/lunar';

Lunar.initialize({
  name: 'Lunar',
});

addDecorator(withA11y);

addDecorator(withInfo);

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

const glob = require.context('../packages', true, /\.story\.tsx?$/);

configure(() => {
  glob.keys().forEach(filename => glob(filename));
}, module);
