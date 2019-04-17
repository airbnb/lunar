import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Form from './Form';
import Switch from './Form/Switch';

storiesOf('Forms/Switch', module)
  .addParameters({
    inspectComponents: [Switch],
  })
  .add('Connected to the parent `Form`.', () => (
    <Form
      onSubmit={() => {
        action('onSubmit')();

        return Promise.resolve();
      }}
    >
      <Switch name="field" label="Label" validator={() => {}} />
    </Form>
  ));
