import React from 'react';
import { storiesOf } from '@storybook/react';
import SteppedProgressBar, { Step } from './SteppedProgressBar';

storiesOf('Core/SteppedProgressBar', module)
  .add('Standard progress bar.', () => (
    <SteppedProgressBar>
      <Step complete />
      <Step complete />
      <Step />
      <Step />
      <Step />
    </SteppedProgressBar>
  ))
  .add('With tooltip labels on each step.', () => (
    <SteppedProgressBar>
      <Step label="Cart" complete />
      <Step label="Checkout" complete />
      <Step label="Billing" complete />
      <Step label="Payment" />
      <Step label="Complete" />
    </SteppedProgressBar>
  ));
