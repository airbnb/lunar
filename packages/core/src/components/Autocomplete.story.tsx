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
  .addParameters({
    inspectComponents: [Autocomplete],
  })
  .add('Standard autocomplete used for searching.', () => (
    <Autocomplete
      accessibilityLabel="Favorite color?"
      label="Favorite color?"
      name="autocomplete"
      onChange={action('onChange')}
      onSelectItem={action('onSelectItem')}
      onLoadItems={value =>
        Promise.resolve(items.filter(item => item.name.toLowerCase().match(value.toLowerCase())))
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
      onLoadItems={value => Promise.reject(new Error('Failed to load.'))}
    />
  ))
  .add('With an error message in an invalid state.', () => (
    <Autocomplete
      invalid
      accessibilityLabel="Label"
      name="autocomplete-error"
      label="Label"
      errorMessage="This field is required."
      onChange={action('onChange')}
      onSelectItem={action('onSelectItem')}
      onLoadItems={value => Promise.resolve([])}
    />
  ))
  .add('With a label description in a disabled state.', () => (
    <Autocomplete
      disabled
      accessibilityLabel="Label"
      name="autocomplete-disabled"
      label="Label"
      labelDescription="This is a small label description."
      onChange={action('onChange')}
      onSelectItem={action('onSelectItem')}
      onLoadItems={value => Promise.resolve([])}
    />
  ))
  .add('Load items on focus.', () => (
    <Autocomplete
      loadItemsOnFocus
      accessibilityLabel="Label"
      name="autocomplete-load-on-focus"
      label="Label"
      labelDescription="Load some items on focus."
      onChange={action('onChange')}
      onSelectItem={action('onSelectItem')}
      onLoadItems={() => Promise.resolve(items)}
    />
  ))
  .add('Disable selected items with `isItemSelectable`.', () => (
    <Autocomplete
      accessibilityLabel="Favorite color?"
      label="Favorite color?"
      name="autocomplete"
      isItemSelectable={(item, selected) => !selected}
      onChange={action('onChange')}
      onSelectItem={action('onSelectItem')}
      onLoadItems={value =>
        Promise.resolve(items.filter(item => item.name.toLowerCase().match(value.toLowerCase())))
      }
    />
  ))
  .add('With custom states in a small form.', () => (
    <>
      <Autocomplete
        loadItemsOnMount
        small
        accessibilityLabel="Label"
        name="autocomplete-state-error"
        label="Error"
        renderError={error => <div>{error.message}</div>}
        onChange={action('onChange')}
        onSelectItem={action('onSelectItem')}
        onLoadItems={value => Promise.reject(new Error('Failed to load.'))}
      />

      <Autocomplete
        loadItemsOnMount
        small
        accessibilityLabel="Label"
        name="autocomplete-state-loading"
        label="Loading"
        renderLoading={() => <div>Loading...</div>}
        onChange={action('onChange')}
        onSelectItem={action('onSelectItem')}
        onLoadItems={value => new Promise(() => {})}
      />

      <Autocomplete
        loadItemsOnMount
        small
        accessibilityLabel="Label"
        name="autocomplete-state-empty"
        label="No results"
        renderNoResults={() => <div>Nothing to see here!</div>}
        onChange={action('onChange')}
        onSelectItem={action('onSelectItem')}
        onLoadItems={value => Promise.resolve([])}
      />
    </>
  ));
