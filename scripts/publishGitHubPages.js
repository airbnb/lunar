#!/usr/bin/env node

const ghp = require('gh-pages');

ghp.publish(
  'storybook-static',
  {
    repo: `https://${process.env.GITHUB_TOKEN}@github.com/airbnb/lunar.git`,
    silent: true,
  },
  () => {
    console.log('Published style guide to GitHub pages!');
  },
);
