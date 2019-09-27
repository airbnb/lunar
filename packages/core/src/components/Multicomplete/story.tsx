import React from 'react';
import { action } from '@storybook/addon-actions';
import Text from '../Text';
import Multicomplete from '.';

export default {
  title: 'Core/Multicomplete',
  parameters: {
    inspectComponents: [Multicomplete],
  },
};

export function anAutocompleteThatSupportsSelectingMultipleItems() {
  return (
    <Multicomplete
      accessibilityLabel="Favorite color?"
      label="Favorite color?"
      name="autocomplete"
      renderItem={(item, highlighted, selected) => <Text bold={selected}>{item.name}</Text>}
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
    />
  );
}

anAutocompleteThatSupportsSelectingMultipleItems.story = {
  name: 'An autocomplete that supports selecting multiple items.',
};

export function supportsPrePopulatingMultipleItems() {
  return (
    <Multicomplete
      accessibilityLabel="Favorite color?"
      label="Favorite color?"
      name="autocomplete"
      renderItem={(item, highlighted, selected) => <Text bold={selected}>{item.name}</Text>}
      value={['red', 'green']}
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
    />
  );
}

supportsPrePopulatingMultipleItems.story = {
  name: 'Supports pre-populating multiple items.',
};

export function loadItemsOnFocusStory() {
  return (
    <Multicomplete
      loadItemsOnFocus
      accessibilityLabel="Favorite color?"
      label="Favorite color?"
      name="autocomplete"
      renderItem={(item, highlighted, selected) => <Text bold={selected}>{item.name}</Text>}
      value={['red', 'green']}
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
    />
  );
}

loadItemsOnFocusStory.story = {
  name: 'Load items on focus.',
};
