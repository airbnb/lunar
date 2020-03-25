import React from 'react';
import Form from './Form';
import Multicomplete from './Form/Multicomplete';

const items = [
  { value: 'red', name: 'Red' },
  { value: 'black', name: 'Black' },
  { value: 'blue', name: 'Blue' },
  { value: 'green', name: 'Green' },
];

export default {
  title: 'Forms/Multicomplete',
  parameters: {
    inspectComponents: [Multicomplete],
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
      <Multicomplete
        name="field"
        label="Label"
        accessibilityLabel="Multicomplete"
        validator={() => {}}
        onChange={action('onChange')}
        onSelectItem={action('onSelectItem')}
        onLoadItems={(value) =>
          Promise.resolve(
            items.filter((item) => item.name.toLowerCase().match(value.toLowerCase())),
          )
        }
      />
    </Form>
  );
}

connectedToTheParentForm.story = {
  name: 'Connected to the parent `Form`.',
};
