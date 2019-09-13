import React from 'react';
import { storiesOf } from '@storybook/react';
import SteppedProgressBar, { Step } from './SteppedProgressBar';

storiesOf('Core/SteppedProgressBar', module)
  .addParameters({
    inspectComponents: [SteppedProgressBar, Step],
  })
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
      <Step complete label="Cart" />
      <Step complete label="Checkout" />
      <Step complete label="Billing" />
      <Step label="Payment" />
      <Step label="Complete" />
    </SteppedProgressBar>
  ));
