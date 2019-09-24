const { RemoteBrowserTarget } = require('happo.io');
const storybook = require('happo-plugin-storybook');

module.exports = {
  apiKey: process.env.HAPPO_API_KEY,
  apiSecret: process.env.HAPPO_API_SECRET,

  compareThreshold: 0.05,

  targets: {
    'chrome-desktop': new RemoteBrowserTarget('chrome', {
      viewport: '1024x768',
    }),
  },

  plugins: [
    storybook({
      outputDir: 'storybook-static',
    }),
  ],
};
