An autocomplete that supports selecting multiple items.

```jsx
<Multicomplete
  accessibilityLabel="Favorite color?"
  label="Favorite color?"
  name="autocomplete"
  onChange={debug('onChange')}
  onSelectItem={debug('onSelectItem')}
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
```

Supports pre-populating multiple items.

```jsx
<Multicomplete
  accessibilityLabel="Favorite color?"
  label="Favorite color?"
  name="autocomplete"
  onChange={debug('onChange')}
  onSelectItem={debug('onSelectItem')}
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
```
