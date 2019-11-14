import fs from 'fs';
import size from 'filesize';
import chalk from 'chalk';
import fetch from 'node-fetch';
import upsertPullRequestComment from '../helpers/upsertPullRequestComment';

type StatMap = {
  [pkg: string]: {
    [dir: string]: number;
  };
};

function calculateDiff(prev: number, next: number): number {
  return (next - prev) / prev;
}

function formatDiff(diff: number): string {
  if (!isFinite(diff) || diff === 0 || diff === 0.0) {
    return 'N/A';
  }

  const sum = diff * 100;
  const percent = sum.toFixed(1);

  // Smaller
  if (percent.startsWith('-')) {
    return `${sum < -10 ? ':small_red_triangle_down: ' : ''}${percent}%`;
  }

  // Larger
  return `${sum > 10 ? ':small_red_triangle: ' : ''}+${percent}%`;
}

async function compareBuildSizes() {
  const nextSizes: StatMap = JSON.parse(fs.readFileSync('./packages/sizes.json', 'utf8'));
  let prevSizes: StatMap = {};
  let sameBuild = false;

  try {
    const request = await fetch(
      'https://raw.githubusercontent.com/airbnb/lunar/master/packages/sizes.json',
    );

    prevSizes = await request.json();
  } catch (error) {
    console.log(error.message);

    prevSizes = nextSizes;
    sameBuild = true;
  }

  function getPrevSize(name: string, type: string) {
    return (prevSizes[name] && prevSizes[name][type]) || 0;
  }

  const output: string[] = [
    '### Size Changes',
    '| Package | Diff | ESM | Prev ESM | CJS | Prev CJS |',
    '| --- | ---: | ---: | ---: | ---: | ---: |',
  ];
  const rows: string[] = [];

  Object.entries(nextSizes).forEach(([pkgName, stats]) => {
    const prevEsm = getPrevSize(pkgName, 'esm');
    const prevLib = getPrevSize(pkgName, 'lib');

    const row = [
      pkgName,
      formatDiff(calculateDiff(prevEsm, stats.esm)),
      size(stats.esm),
      prevEsm === 0 ? 'N/A' : size(prevEsm),
      size(stats.lib),
      prevLib === 0 ? 'N/A' : size(prevLib),
    ];

    rows.push(`| ${row.join(' | ')} |`);
  });

  // Sort rows before joining to output
  rows.sort();

  output.push(...rows);
  output.push('> Compared to master. File sizes are unminified and ungzipped.');

  // Show dumps for easier debugging
  if (!sameBuild) {
    output.push(`<details>
<summary>View raw build stats</summary>

#### Previous (master)
\`\`\`json
${JSON.stringify(prevSizes, null, 2)}
\`\`\`

#### Current
\`\`\`json
${JSON.stringify(nextSizes, null, 2)}
\`\`\`
</details>`);
  }

  // Leave a comment on the PR
  const breakdown = output.join('\n');

  try {
    await upsertPullRequestComment('### Size Changes', breakdown);
  } catch {
    console.log(breakdown);
  }
}

compareBuildSizes().catch(error => {
  console.error(chalk.red(error.message));
  process.exitCode = 1;
});
