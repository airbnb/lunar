import React from 'react';
import { action } from '@storybook/addon-actions';
import Form from './Form';
import DatePickerInput from './Form/DatePickerInput';

export default {
  title: 'Forms/DatePickerInput',
  parameters: {
    inspectComponents: [DatePickerInput],
  },
};

export function connectedToTheParentForm() {
  return (
    <Form
      onSubmit={() => {
        action('onSubmit')();

        return Promise.resolve();
      }}
    >
      <DatePickerInput
        name="field"
        label="Label"
        validator={() => {}}
        datePickerProps={{
          onMonthChange: action('onMonthChange'),
        }}
        onChange={action('onChange')}
      />
    </Form>
  );
}

connectedToTheParentForm.story = {
  name: 'Connected to the parent `Form`.',
};
