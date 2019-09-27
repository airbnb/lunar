import React from 'react';
import { action } from '@storybook/addon-actions';
import FormActions from '.';

export default {
  title: 'Core/FormActions',
  parameters: {
    inspectComponents: [FormActions],
  },
};

export function aPairOfFormActionButtons() {
  return <FormActions />;
}

aPairOfFormActionButtons.story = {
  name: 'A pair of form action buttons.',
};

export function withCustomTextAndClickHandlers() {
  return (
    <FormActions
      cancelText="Close"
      continueText="Send"
      onCancel={action('onCancel')}
      onContinue={action('onContinue')}
    />
  );
}

withCustomTextAndClickHandlers.story = {
  name: 'With custom text and click handlers.',
};

export function withNoCancelButton() {
  return <FormActions hideCancel />;
}

withNoCancelButton.story = {
  name: 'With no cancel button.',
};

export function withAResetButton() {
  return <FormActions showReset />;
}

withAResetButton.story = {
  name: 'With a reset button.',
};

export function withSmallButtonsInAProcessingState() {
  return <FormActions showReset small processing />;
}

withSmallButtonsInAProcessingState.story = {
  name: 'With small buttons in a processing state.',
};

export function inADangerState() {
  return <FormActions danger />;
}

inADangerState.story = {
  name: 'In a danger state.',
};
