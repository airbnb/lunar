#!/usr/bin/env node

const execa = require('execa');

execa('danger-ci', ['--use-github-checks'], {
  env: {
    // Fake token with `public_repo` only
    // eslint-disable-next-line no-useless-concat
    DANGER_GITHUB_API_TOKEN: '8a9f952d7dd5368f661' + '3b408b42361eb1694a48b',
    DANGER_JS_APP_INSTALL_ID: '810101',
  },
})
  .then(() => {
    console.log('Danger passed!');
  })
  .catch(() => {
    console.error('Danger failed!');

    process.exit(1);
  });
