declare module '@airbnb/nimbus/scripts/helpers/createGitHubClient' {
  import Octokit from '@octokit/rest';

  function createGitHubClient(token?: string): Octokit;

  export = createGitHubClient;
}
