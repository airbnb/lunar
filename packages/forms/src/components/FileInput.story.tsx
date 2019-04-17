import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Form from './Form';
import FileInput from './Form/FileInput';

storiesOf('Forms/FileInput', module)
  .addParameters({
    inspectComponents: [FileInput],
  })
  .add('Connected to the parent `Form`.', () => (
    <Form
      onSubmit={() => {
        action('onSubmit')();

        return Promise.resolve();
      }}
    >
      <FileInput name="field" label="Label" validator={() => {}} />
    </Form>
  ));
