import { addParameters, configure } from '@storybook/react';

addParameters({});

// Automatically import all story files
const glob = require.context('../packages', true, /\.story\.tsx?$/);

configure(() => {
  glob.keys().forEach(filename => glob(filename));
}, module);
