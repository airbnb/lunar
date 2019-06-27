import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Text from './Text';
import Multicomplete from './Multicomplete';

storiesOf('Core/Multicomplete', module)
  .addParameters({
    inspectComponents: [Multicomplete],
  })
  .add('An autocomplete that supports selecting multiple items.', () => (
    <Multicomplete
      accessibilityLabel="Favorite color?"
      label="Favorite color?"
      name="autocomplete"
      onChange={action('onChange')}
      onSelectItem={action('onSelectItem')}
      onLoadItems={value =>
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
      onLoadItems={value =>
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
  ))
  .add('Load items on focus.', () => (
    <Multicomplete
      accessibilityLabel="Favorite color?"
      label="Favorite color?"
      name="autocomplete"
      onChange={action('onChange')}
      onSelectItem={action('onSelectItem')}
      onLoadItems={value =>
        Promise.resolve(
          [
            { value: 'red', name: 'Red' },
            { value: 'black', name: 'Black' },
            { value: 'blue', name: 'Blue' },
            { value: 'green', name: 'Green' },
          ].filter(item => !value || item.name.toLowerCase().match(value.toLowerCase())),
        )
      }
      renderItem={(item, highlighted, selected) => <Text bold={selected}>{item.name}</Text>}
      value={['red', 'green']}
      loadItemsOnFocus
    />
  ));
