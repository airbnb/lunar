import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Form from './Form';
import CheckBox from './Form/CheckBox';

storiesOf('Forms/CheckBox', module)
  .addParameters({
    inspectComponents: [CheckBox],
  })
  .add('Connected to the parent `Form`.', () => (
    <Form
      onSubmit={() => {
        action('onSubmit')();

        return Promise.resolve();
      }}
    >
      <CheckBox name="field" label="Label" validator={() => {}} />
    </Form>
  ));
