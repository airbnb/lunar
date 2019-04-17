import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Form from './Form';
import DatePickerInput from './Form/DatePickerInput';

storiesOf('Forms/DatePickerInput', module)
  .addParameters({
    inspectComponents: [DatePickerInput],
  })
  .add('Connected to the parent `Form`.', () => (
    <Form
      onSubmit={() => {
        action('onSubmit')();

        return Promise.resolve();
      }}
    >
      <DatePickerInput name="field" label="Label" validator={() => {}} />
    </Form>
  ));
