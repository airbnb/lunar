import React from 'react';
import ProgressBar from '.';

export default {
  title: 'Core/ProgressBar',
  parameters: {
    inspectComponents: [ProgressBar],
  },
};

export function aProgressBarWithDifferentCompletionPercentagesAndWidths() {
  return (
    <>
      <ProgressBar percent={1} />
      <br />
      <ProgressBar percent={29} />
      <br />
      <ProgressBar percent={100} />
      <br />
      <ProgressBar percent={63} />
    </>
  );
}

aProgressBarWithDifferentCompletionPercentagesAndWidths.story = {
  name: 'A progress bar with different completion percentages and widths.',
};

export function canDisableLeadingAndTrailingEdgesNoRoundedCorners() {
  return (
    <>
      <ProgressBar leading percent={50} />
      <br />
      <ProgressBar trailing percent={50} />
    </>
  );
}

canDisableLeadingAndTrailingEdgesNoRoundedCorners.story = {
  name: 'Can disable leading and trailing edges (no rounded corners).',
};
