import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Form from './Form';
import Autocomplete from './Form/Autocomplete';

const items = [
  { value: 'red', name: 'Red' },
  { value: 'black', name: 'Black' },
  { value: 'blue', name: 'Blue' },
  { value: 'green', name: 'Green' },
];

storiesOf('Forms/Autocomplete', module)
  .addParameters({
    inspectComponents: [Autocomplete],
  })
  .add('Connected to the parent `Form`.', () => (
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
  ));
