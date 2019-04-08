import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Autocomplete from './Autocomplete';

const items = [
  { value: 'red', name: 'Red' },
  { value: 'black', name: 'Black' },
  { value: 'blue', name: 'Blue' },
  { value: 'green', name: 'Green' },
];

storiesOf('Core/Autocomplete', module)
  .add('Standard autocomplete used for searching.', () => (
    <Autocomplete
      accessibilityLabel="Favorite color?"
      label="Favorite color?"
      name="autocomplete"
      onChange={action('onChange')}
      onSelectItem={action('onSelectItem')}
      onLoadOptions={value =>
        Promise.resolve(
          items.filter(item => item.name.toLowerCase().match(value.toLowerCase())),
        ) as any
      }
    />
  ))
  .add('Supports errors thrown within promises.', () => (
    <Autocomplete
      accessibilityLabel="Favorite color?"
      label="Favorite color?"
      name="autocomplete-reject"
      onChange={action('onChange')}
      onSelectItem={action('onSelectItem')}
      onLoadOptions={value => Promise.reject(new Error('Failed to load.'))}
    />
  ))
  .add('With an error message in an invalid state.', () => (
    <Autocomplete
      accessibilityLabel="Label"
      name="autocomplete-error"
      label="Label"
      onChange={action('onChange')}
      onSelectItem={action('onSelectItem')}
      onLoadOptions={value => Promise.resolve([])}
      errorMessage="This field is required."
      invalid
    />
  ))
  .add('With a label description in a disabled state.', () => (
    <Autocomplete
      accessibilityLabel="Label"
      name="autocomplete-disabled"
      label="Label"
      onChange={action('onChange')}
      onSelectItem={action('onSelectItem')}
      onLoadOptions={value => Promise.resolve([])}
      labelDescription="This is a small label description."
      disabled
    />
  ))
  .add('Disable selected items with `isItemSelectable`.', () => (
    <Autocomplete
      accessibilityLabel="Favorite color?"
      label="Favorite color?"
      name="autocomplete"
      onChange={action('onChange')}
      onSelectItem={action('onSelectItem')}
      onLoadOptions={value =>
        Promise.resolve(items.filter(item => item.name.toLowerCase().match(value.toLowerCase())))
      }
      isItemSelectable={(item, selected) => !selected}
    />
  ))
  .add('With custom states in a compact form.', () => (
    <>
      <Autocomplete
        accessibilityLabel="Label"
        name="autocomplete-state-error"
        label="Error"
        onChange={action('onChange')}
        onSelectItem={action('onSelectItem')}
        onLoadOptions={value => Promise.reject(new Error('Failed to load.'))}
        renderError={error => <div>{error.message}</div>}
        loadItemsOnMount
        compact
      />

      <Autocomplete
        accessibilityLabel="Label"
        name="autocomplete-state-loading"
        label="Loading"
        onChange={action('onChange')}
        onSelectItem={action('onSelectItem')}
        onLoadOptions={value => new Promise(() => {})}
        renderLoading={() => <div>Loading...</div>}
        loadItemsOnMount
        compact
      />

      <Autocomplete
        accessibilityLabel="Label"
        name="autocomplete-state-empty"
        label="No results"
        onChange={action('onChange')}
        onSelectItem={action('onSelectItem')}
        onLoadOptions={value => Promise.resolve([])}
        renderNoResults={() => <div>Nothing to see here!</div>}
        loadItemsOnMount
        compact
      />
    </>
  ));
