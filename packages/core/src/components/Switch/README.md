A standard switch field.

```jsx
<Switch name="switch-basic" label="Label" onChange={debug('onChange')} />
```

With an error message in an invalid state.

```jsx
<Switch
  name="switch-error"
  label="Label"
  onChange={debug('onChange')}
  errorMessage="This field is required."
  invalid
/>
```

With a label description in a disabled state.

```jsx
<Switch
  name="switch-disabled"
  label="Label"
  labelDescription="This is a small label description."
  onChange={debug('onChange')}
  disabled
/>
```

Marked as optional.

```jsx
<Switch name="switch-optional" label="Label" onChange={debug('onChange')} optional />
```

Marked as checked in different states.

```jsx
<Switch name="switch-checked" label="Label" onChange={debug('onChange')} checked />
<Switch name="switch-checked-disabled" label="Label" onChange={debug('onChange')} checked disabled />
<Switch name="switch-checked-invalid" label="Label" onChange={debug('onChange')} checked invalid />
```
