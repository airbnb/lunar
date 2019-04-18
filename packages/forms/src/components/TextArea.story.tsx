import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Form from './Form';
import TextArea from './Form/TextArea';

storiesOf('Forms/TextArea', module)
  .addParameters({
    inspectComponents: [TextArea],
  })
  .add('Connected to the parent `Form`.', () => (
    <Form
      onSubmit={() => {
        action('onSubmit')();

        return Promise.resolve();
      }}
    >
      <TextArea name="field" label="Label" validator={() => {}} />
    </Form>
  ));
