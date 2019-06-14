const execa = require('execa');
const checkCommitFormat = require('conventional-changelog-beemo/lib/checkCommitFormat').default;

module.exports = function getChangelogFromGitHistory() {
  const format = {
    subject: '%s',
    hash: '%h',
    date: '%ct',
  };
  const history = execa.sync('git', [
    'log',
    `--pretty=format:${JSON.stringify(format)},`,
    '--since=1.month',
  ]).stdout;
  const components = {};
  let data = [];

  try {
    data = JSON.parse(`[${history.slice(0, -1)}]`);
  } catch {
    return components;
  }

  data.forEach(row => {
    const { subject, hash, date } = row;

    if (!subject || subject.includes('[ci skip]')) {
      return;
    }

    const commit = checkCommitFormat(subject);

    if (!commit || !commit.scope) {
      return;
    }

    const message = subject
      .replace(`${commit.type}(${commit.scope}):`, '')
      .replace(/(\(#\d+\))/, '')
      .trim();

    commit.scope.split(',').forEach(scope => {
      const name = scope.trim();

      if (!components[name]) {
        components[name] = [];
      }

      components[name].push({
        date,
        hash,
        message,
        type: commit.type,
      });
    });
  });

  return components;
};
