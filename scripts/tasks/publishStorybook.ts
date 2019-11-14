import ghp from 'gh-pages';

ghp.publish(
  'storybook-static',
  {
    repo: `https://${process.env.GITHUB_TOKEN}@github.com/airbnb/lunar.git`,
    silent: true,
  },
  () => {
    console.log('Published storybook to GitHub pages!');
  },
);
