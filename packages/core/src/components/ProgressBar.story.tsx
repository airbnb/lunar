import React from 'react';
import { storiesOf } from '@storybook/react';
import ProgressBar from './ProgressBar';

storiesOf('Core/ProgressBar', module)
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
      <ProgressBar percent={50} leading />
      <br />
      <ProgressBar percent={50} trailing />
    </>
  ));
