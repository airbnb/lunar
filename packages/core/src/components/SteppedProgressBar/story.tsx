import React from 'react';
import SteppedProgressBar, { Step } from '.';

export default {
  title: 'Core/SteppedProgressBar',
  parameters: {
    inspectComponents: [SteppedProgressBar, Step],
  },
};

export function standardProgressBar() {
  return (
    <SteppedProgressBar>
      <Step complete />
      <Step complete />
      <Step />
      <Step />
      <Step />
    </SteppedProgressBar>
  );
}

standardProgressBar.story = {
  name: 'Standard progress bar.',
};

export function withTooltipLabelsOnEachStep() {
  return (
    <SteppedProgressBar>
      <Step complete label="Cart" />
      <Step complete label="Checkout" />
      <Step complete label="Billing" />
      <Step label="Payment" />
      <Step label="Complete" />
    </SteppedProgressBar>
  );
}

withTooltipLabelsOnEachStep.story = {
  name: 'With tooltip labels on each step.',
};
