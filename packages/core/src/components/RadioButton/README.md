A standard radio button field.

```jsx
<RadioButton name="radio-basic" label="Label" value="foo" onChange={debug('onChange')} />
```

With an error message in an invalid state.

```jsx
<RadioButton
  name="radio-error"
  label="Label"
  value="foo"
  onChange={debug('onChange')}
  errorMessage="This field is required."
  invalid
/>
```

With a label description in a disabled state.

```jsx
<RadioButton
  name="radio-disabled"
  label="Label"
  value="foo"
  labelDescription="This is a small label description."
  onChange={debug('onChange')}
  disabled
/>
```

With a top alignment.

```jsx
<RadioButton
  topAlign
  name="radio-disabled"
  label="Label"
  value="foo"
  labelDescription="This is a small label description."
  onChange={debug('onChange')}
/>
```

Marked as optional.

```jsx
<RadioButton
  name="radio-optional"
  label="Label"
  value="foo"
  onChange={debug('onChange')}
  optional
/>
```

Marked as checked in different states.

```jsx
<RadioButton name="radio-checked" label="Label" value="foo" onChange={debug('onChange')} checked />
<RadioButton
  name="radio-checked-disabled"
  label="Label"
  value="foo"
  onChange={debug('onChange')}
  checked
  disabled
/>
<RadioButton
  name="radio-checked-invalid"
  label="Label"
  value="foo"
  onChange={debug('onChange')}
  checked
  invalid
/>
```

As a large clickable button.

```jsx
<RadioButton
  name="radio-basic"
  label="Label"
  labelDescription="This is a label description."
  value="foo"
  onChange={debug('onChange')}
  button
/>
```
