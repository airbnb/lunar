import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Form from './Form';
import FormActions from './FormActions';

storiesOf('Forms/FormActions', module)
  .addParameters({
    inspectComponents: [FormActions],
  })
  .add('Connected to the parent `Form`.', () => (
    <Form
      onSubmit={() => {
        action('onSubmit')();

        return Promise.resolve();
      }}
    >
      <FormActions />
    </Form>
  ));
