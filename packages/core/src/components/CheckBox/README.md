A standard checkbox field.

```jsx
<CheckBox name="cb-basic" label="Label" onChange={debug('onChange')} />
```

With an error message in an invalid state.

```jsx
<CheckBox
  name="cb-error"
  label="Label"
  onChange={debug('onChange')}
  errorMessage="This field is required."
  invalid
/>
```

With a label description in a disabled state.

```jsx
<CheckBox
  name="cb-disabled"
  label="Label"
  labelDescription="This is a small label description."
  onChange={debug('onChange')}
  disabled
/>
```

With a top alignment.

```jsx
<CheckBox
  topAlign
  name="cb-disabled"
  label="Label"
  labelDescription="This is a small label description."
  onChange={debug('onChange')}
/>
```

Marked as optional.

```jsx
<CheckBox name="cb-optional" label="Label" onChange={debug('onChange')} optional />
```

Marked as checked in different states.

```jsx
<CheckBox name="cb-checked" label="Label" onChange={debug('onChange')} checked />{' '}
<CheckBox name="cb-checked-disabled" label="Label" onChange={debug('onChange')} checked disabled />{' '}
<CheckBox name="cb-checked-invalid" label="Label" onChange={debug('onChange')} checked invalid />
```

As a large clickable button.

```jsx
<CheckBox
  name="cb-basic"
  label="Label"
  labelDescription="This is a label description."
  onChange={debug('onChange')}
  button
/>
```
