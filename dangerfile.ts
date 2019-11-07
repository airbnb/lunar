import { markdown } from 'danger';
import * as fs from 'fs';
import * as fetch from 'node-fetch';
import * as size from 'filesize';
import {
  checkForInvalidLocks,
  checkForConventionalPrefix,
  checkForConventionalSquashCommit,
  disableComponentSnapshots,
} from '@airbnb/config-danger';

checkForInvalidLocks();
checkForConventionalPrefix();
checkForConventionalSquashCommit();
disableComponentSnapshots();

type StatMap = {
  [pkg: string]: {
    [dir: string]: number;
  };
};

async function comparePreviousBuildSizes() {
  const nextSizes: StatMap = JSON.parse(fs.readFileSync('./packages/sizes.json', 'utf8'));
  let prevSizes: StatMap = {};

  try {
    const request = await fetch(
      'https://raw.githubusercontent.com/airbnb/lunar/master/packages/sizes.json',
    );

    prevSizes = await request.json();
  } catch {
    prevSizes = nextSizes;
  }

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
      return `${sum > -2.5 ? ':small_red_triangle_down: ' : ''}${percent}%`;
    }

    // Larger
    return `${sum > 2.5 ? ':small_red_triangle: ' : ''}+${percent}%`;
  }

  function getPrevSize(name: string, type: string) {
    return (prevSizes[name] && prevSizes[name][type]) || 0;
  }

  const output: string[] = [
    '### Size Changes',
    '| Package | Diff | ESM | Prev ESM | CJS | Prev CJS |',
    '| --- | ---: | ---: | ---: | ---: | ---: |',
  ];
  const rows = [];

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

  markdown(output.join('\n'));
}

comparePreviousBuildSizes();
