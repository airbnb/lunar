import Octokit from '@octokit/rest';
import createGitHubClient from '@airbnb/nimbus/scripts/helpers/createGitHubClient';

const { GITHUB_USER, TRAVIS_PULL_REQUEST, TRAVIS_PULL_REQUEST_SLUG } = process.env;

export default async function upsertPullRequestComment(query: string, body: string) {
  if (TRAVIS_PULL_REQUEST === 'false') {
    return;
  }

  const [owner, repo] = TRAVIS_PULL_REQUEST_SLUG.split('/');
  const prNumber = Number(TRAVIS_PULL_REQUEST);
  const client: Octokit = createGitHubClient();

  // Load all comments
  const { data: comments } = await client.issues.listComments({
    issue_number: prNumber,
    owner,
    repo,
  });

  // Find a previously created comment by our bot
  const previousComments = comments.filter(
    comment => comment.body.includes(query) && comment.user.login === GITHUB_USER,
  );

  // Update existing comment
  if (previousComments.length > 0) {
    await client.issues.updateComment({
      comment_id: previousComments[0].id,
      owner,
      repo,
      body,
    });

    // Insert a new comment
  } else {
    await client.issues.createComment({
      issue_number: prNumber,
      owner,
      repo,
      body,
    });
  }
}
