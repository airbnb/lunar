import { danger, fail, warn } from 'danger';
import checkCommitFormat from 'conventional-changelog-beemo/lib/checkCommitFormat';

// Verify the PR title contains the conventional-changelog required prefix.
// https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-eslint
if (!checkCommitFormat(danger.github.pr.title)) {
  fail(
    'Pull request title requires a conventional changelog prefix. [View commit message format](https://github.com/beemojs/conventional-changelog-beemo#commit-message-format).',
  );
}

// When a PR only has 1 commit, and a squash merge occurs, the commit is used as-is,
// and the PR title is lost, resulting in the semver prefix also being lost.
if (
  danger.github.pr.commits <= 1 &&
  danger.github.commits[0].commit.message !== danger.github.pr.title
) {
  fail(
    'Automatic releases requires commit message to match PR title if PR contains only 1 commit.',
  );
}

// Component snapshot testing is deprecated, so disallow new snapshots.
const filter = (file: string) => file.endsWith('jsx.snap') || file.endsWith('tsx.snap');
const hasCreatedSnapshot = danger.git.created_files.some(filter);
const hasUpdatedSnapshots = danger.git.modified_files.some(filter);

if (hasCreatedSnapshot || hasUpdatedSnapshots) {
  const message = 'Snapshot testing has been deprecated. Please migrate to standard React testing.';

  if (hasCreatedSnapshot) {
    fail(message);
  } else {
    warn(message);
  }
}
