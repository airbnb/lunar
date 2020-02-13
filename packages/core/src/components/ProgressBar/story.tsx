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

export function progressBarWithStatus() {
  return (
    <>
      <ProgressBar percent={8} />
      <br />
      <ProgressBar danger percent={16} />
      <br />
      <ProgressBar muted percent={48} />
      <br />
      <ProgressBar notice percent={64} />
      <br />
      <ProgressBar success percent={80} />
      <br />
      <ProgressBar warning percent={95} />
    </>
  );
}

progressBarWithStatus.story = {
  name: 'Progress bar: default, danger, muted, notice, success, and warning.',
};
