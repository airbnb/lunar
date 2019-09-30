import React from 'react';
import { storiesOf } from '@storybook/react';
import ProgressBar from '.';

storiesOf('Core/ProgressBar', module)
  .addParameters({
    inspectComponents: [ProgressBar],
  })
  .add('A progress bar with different completion percentages and widths.', () => (
    <>
      <ProgressBar percent={1} />
      <br />
      <ProgressBar percent={29} />
      <br />
      <ProgressBar percent={100} />
      <br />
      <ProgressBar percent={63} />
    </>
  ))
  .add('Can disable leading and trailing edges (no rounded corners).', () => (
    <>
      <ProgressBar leading percent={50} />
      <br />
      <ProgressBar trailing percent={50} />
    </>
  ));
