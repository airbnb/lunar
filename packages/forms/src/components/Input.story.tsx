import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Form from './Form';
import Input from './Form/Input';

storiesOf('Forms/Input', module)
  .addParameters({
    inspectComponents: [Input],
  })
  .add('Connected to the parent `Form`.', () => (
    <Form
      onSubmit={() => {
        action('onSubmit')();

        return Promise.resolve();
      }}
    >
      <Input name="field" label="Label" validator={() => {}} />
    </Form>
  ));
