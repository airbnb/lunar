import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import FormActions from './FormActions';

storiesOf('Core/FormActions', module)
  .add('A pair of form action buttons.', () => <FormActions />)
  .add('With custom text and click handlers.', () => (
    <FormActions
      cancelText="Close"
      continueText="Send"
      onCancel={action('onCancel')}
      onContinue={action('onContinue')}
    />
  ))
  .add('With no cancel button.', () => <FormActions hideCancel />)
  .add('With a reset button.', () => <FormActions showReset />)
  .add('With small buttons in a processing state.', () => (
    <FormActions showReset small processing />
  ));
