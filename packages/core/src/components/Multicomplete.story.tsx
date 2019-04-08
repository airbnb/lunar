import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Text from './Text';
import Multicomplete from './Multicomplete';

storiesOf('Core/Multicomplete', module)
  .add('An autocomplete that supports selecting multiple items.', () => (
    <Multicomplete
      accessibilityLabel="Favorite color?"
      label="Favorite color?"
      name="autocomplete"
      onChange={action('onChange')}
      onSelectItem={action('onSelectItem')}
      onLoadOptions={value =>
        Promise.resolve(
          [
            { value: 'red', name: 'Red' },
            { value: 'black', name: 'Black' },
            { value: 'blue', name: 'Blue' },
            { value: 'green', name: 'Green' },
          ].filter(item => item.name.toLowerCase().match(value.toLowerCase())),
        )
      }
      renderItem={(item, highlighted, selected) => <Text bold={selected}>{item.name}</Text>}
    />
  ))
  .add('Supports pre-populating multiple items.', () => (
    <Multicomplete
      accessibilityLabel="Favorite color?"
      label="Favorite color?"
      name="autocomplete"
      onChange={action('onChange')}
      onSelectItem={action('onSelectItem')}
      onLoadOptions={value =>
        Promise.resolve(
          [
            { value: 'red', name: 'Red' },
            { value: 'black', name: 'Black' },
            { value: 'blue', name: 'Blue' },
            { value: 'green', name: 'Green' },
          ].filter(item => item.name.toLowerCase().match(value.toLowerCase())),
        )
      }
      renderItem={(item, highlighted, selected) => <Text bold={selected}>{item.name}</Text>}
      value={['red', 'green']}
    />
  ));
