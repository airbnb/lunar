import React from 'react';
import Form from './Form';
import Autocomplete from './Form/Autocomplete';

const items = [
  { value: 'red', name: 'Red' },
  { value: 'black', name: 'Black' },
  { value: 'blue', name: 'Blue' },
  { value: 'green', name: 'Green' },
];

export default {
  title: 'Forms/Autocomplete',
  parameters: {
    inspectComponents: [Autocomplete],
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
      <Autocomplete
        name="field"
        label="Label"
        accessibilityLabel="Autocomplete"
        validator={() => {}}
        onLoadItems={value =>
          Promise.resolve(items.filter(item => item.name.toLowerCase().match(value.toLowerCase())))
        }
      />
    </Form>
  );
}

connectedToTheParentForm.story = {
  name: 'Connected to the parent `Form`.',
};
