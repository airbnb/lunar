module.exports = {
  // cwd is the .storybook folder
  stories: ['../packages/**/story.tsx', '../packages/**/*.story.tsx'],
  // cwd is the root :/
  addons: [
    './.storybook/addons/props/register',
    './.storybook/addons/story/register',
    '@storybook/addon-actions/register',
    '@storybook/addon-a11y/register',
    '@storybook/addon-links/register',
    '@storybook/addon-viewport/register',
    '@storybook/addon-contexts/register',
  ],
};
