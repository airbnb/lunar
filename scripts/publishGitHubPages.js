#!/usr/bin/env node

const ghp = require('gh-pages');

ghp.publish(
  'public',
  {
    repo: `https://${process.env.GH_TOKEN}@github.com/airbnb/lunar.git`,
    silent: true,
  },
  () => {
    console.log('Published style guide to GitHub pages!');
  },
);
