#!/usr/bin/env node

const gph = require('gh-pages');

gph.publish(
  'public',
  {
    repo: `https://${process.env.GH_TOKEN$}@github.com/airbnb/lunar.git`,
    silent: true,
  },
  () => {
    console.log('Published styleguide to GitHub pages');
  },
);
