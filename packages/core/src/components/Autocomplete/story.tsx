import React from 'react';
import Autocomplete from '.';

const items = [
  { value: 'red', name: 'Red' },
  { value: 'black', name: 'Black' },
  { value: 'blue', name: 'Blue' },
  { value: 'green', name: 'Green' },
];

export default {
  title: 'Core/Autocomplete',
  parameters: {
    inspectComponents: [Autocomplete],
  },
};

export function standardAutocompleteUsedForSearching() {
  return (
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
  );
}

standardAutocompleteUsedForSearching.story = {
  name: 'Standard autocomplete used for searching.',
};

export function supportsErrorsThrownWithinPromises() {
  return (
    <Autocomplete
      accessibilityLabel="Favorite color?"
      label="Favorite color?"
      name="autocomplete-reject"
      onChange={action('onChange')}
      onSelectItem={action('onSelectItem')}
      onLoadItems={value => Promise.reject(new Error('Failed to load.'))}
    />
  );
}

supportsErrorsThrownWithinPromises.story = {
  name: 'Supports errors thrown within promises.',
};

export function withAnErrorMessageInAnInvalidState() {
  return (
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
  );
}

withAnErrorMessageInAnInvalidState.story = {
  name: 'With an error message in an invalid state.',
};

export function withALabelDescriptionInADisabledState() {
  return (
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
  );
}

withALabelDescriptionInADisabledState.story = {
  name: 'With a label description in a disabled state.',
};

export function loadItemsOnFocusStory() {
  return (
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
  );
}

loadItemsOnFocusStory.story = {
  name: 'Load items on focus.',
};

export function disableSelectedItemsWithIsItemSelectable() {
  return (
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
  );
}

disableSelectedItemsWithIsItemSelectable.story = {
  name: 'Disable selected items with `isItemSelectable`.',
};

export function withCustomStatesInDifferentSizes() {
  return (
    <>
      <Autocomplete
        loadItemsOnMount
        small
        accessibilityLabel="Label"
        name="autocomplete-state-error"
        label="Error (small)"
        renderError={error => <div>{error.message}</div>}
        onChange={action('onChange')}
        onSelectItem={action('onSelectItem')}
        onLoadItems={value => Promise.reject(new Error('Failed to load.'))}
      />

      <Autocomplete
        loadItemsOnMount
        accessibilityLabel="Label"
        name="autocomplete-state-loading"
        label="Loading (regular)"
        renderLoading={() => <div>Loading...</div>}
        onChange={action('onChange')}
        onSelectItem={action('onSelectItem')}
        onLoadItems={value => new Promise(() => {})}
      />

      <Autocomplete
        loadItemsOnMount
        large
        accessibilityLabel="Label"
        name="autocomplete-state-empty"
        label="No results (large)"
        renderNoResults={() => <div>Nothing to see here!</div>}
        onChange={action('onChange')}
        onSelectItem={action('onSelectItem')}
        onLoadItems={value => Promise.resolve([])}
      />
    </>
  );
}

withCustomStatesInDifferentSizes.story = {
  name: 'With custom states in different sizes.',
};

export function canSelectUnknownValueWhenHittingEnter() {
  return (
    <Autocomplete
      selectUnknownOnEnter
      accessibilityLabel="Favorite color?"
      label="Favorite color?"
      name="autocomplete"
      onChange={action('onChange')}
      onSelectItem={action('onSelectItem')}
      onLoadItems={value =>
        Promise.resolve(items.filter(item => item.name.toLowerCase().match(value.toLowerCase())))
      }
    />
  );
}

canSelectUnknownValueWhenHittingEnter.story = {
  name: 'Can select unknown value when hitting enter.',
};
