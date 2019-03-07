A standard autocomplete used for searching.

```jsx
const items = [
  { value: 'red', name: 'Red' },
  { value: 'black', name: 'Black' },
  { value: 'blue', name: 'Blue' },
  { value: 'green', name: 'Green' },
];

<Autocomplete
  accessibilityLabel="Favorite color?"
  label="Favorite color?"
  name="autocomplete"
  onChange={debug('onChange')}
  onSelectItem={debug('onSelectItem')}
  onLoadOptions={value =>
    Promise.resolve(items.filter(item => item.name.toLowerCase().match(value.toLowerCase())))
  }
/>;
```

Supports errors thrown within promises.

```jsx
<Autocomplete
  accessibilityLabel="Favorite color?"
  label="Favorite color?"
  name="autocomplete-reject"
  onChange={debug('onChange')}
  onSelectItem={debug('onSelectItem')}
  onLoadOptions={value => Promise.reject(new Error('Failed to load.'))}
/>
```

With an error message in an invalid state.

```jsx
<Autocomplete
  accessibilityLabel="Label"
  name="autocomplete-error"
  label="Label"
  onChange={debug('onChange')}
  onSelectItem={debug('onSelectItem')}
  onLoadOptions={value => Promise.resolve([])}
  errorMessage="This field is required."
  invalid
/>
```

With a label description in a disabled state.

```jsx
<Autocomplete
  accessibilityLabel="Label"
  name="autocomplete-disabled"
  label="Label"
  onChange={debug('onChange')}
  onSelectItem={debug('onSelectItem')}
  onLoadOptions={value => Promise.resolve([])}
  labelDescription="This is a small label description."
  disabled
/>
```

Disable selected items with `isItemSelectable`.

```jsx
const items = [
  { value: 'red', name: 'Red' },
  { value: 'black', name: 'Black' },
  { value: 'blue', name: 'Blue' },
  { value: 'green', name: 'Green' },
];

<Autocomplete
  accessibilityLabel="Favorite color?"
  label="Favorite color?"
  name="autocomplete"
  onChange={debug('onChange')}
  onSelectItem={debug('onSelectItem')}
  onLoadOptions={value =>
    Promise.resolve(items.filter(item => item.name.toLowerCase().match(value.toLowerCase())))
  }
  isItemSelectable={(item, selected) => !selected}
/>;
```

With custom states in a compact form.

```jsx
<Autocomplete
  accessibilityLabel="Label"
  name="autocomplete-state-error"
  label="Error"
  onChange={debug('onChange')}
  onSelectItem={debug('onSelectItem')}
  onLoadOptions={value => Promise.reject(new Error('Failed to load.'))}
  renderError={error => error.message}
  loadItemsOnMount
  compact
/>

<Autocomplete
  accessibilityLabel="Label"
  name="autocomplete-state-loading"
  label="Loading"
  onChange={debug('onChange')}
  onSelectItem={debug('onSelectItem')}
  onLoadOptions={value => new Promise(() => {})}
  renderLoading={() => 'Loading...'}
  loadItemsOnMount
  compact
/>

<Autocomplete
  accessibilityLabel="Label"
  name="autocomplete-state-empty"
  label="No results"
  onChange={debug('onChange')}
  onSelectItem={debug('onSelectItem')}
  onLoadOptions={value => Promise.resolve([])}
  renderNoResults={() => 'Nothing to see here!'}
  loadItemsOnMount
  compact
/>
```
