import { addDecorator, addParameters, configure } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';

addDecorator(withA11y);

addParameters({
  backgrounds: [
    { name: 'twitter', value: '#00aced', default: true },
    { name: 'facebook', value: '#3b5998' },
  ],
});

configure(() => {
  const glob = require.context('../packages', true, /\.story\.tsx?$/);

  glob.keys().forEach(filename => glob(filename));
}, module);
