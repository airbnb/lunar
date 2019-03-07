A standard text field.

```jsx
<Input name="input-basic" label="Label" placeholder="Placeholder" onChange={debug('onChange')} />
```

With a compact smaller view.

```jsx
<Input name="input-compact" label="Compact" placeholder="Placeholder" onChange={debug('onChange')} compact />
<Input name="input-regular" label="Regular" placeholder="Placeholder" onChange={debug('onChange')} />
```

With an error message in an invalid state.

```jsx
<Input
  name="input-error"
  label="Label"
  onChange={debug('onChange')}
  errorMessage="This field is required."
  invalid
/>
```

With a label description in a disabled state.

```jsx
<Input
  name="input-disabled"
  label="Label"
  labelDescription="This is a small label description."
  onChange={debug('onChange')}
  disabled
/>
```

With a hidden label and password type.

```jsx
<Input
  name="input-custom"
  label="Label"
  onChange={debug('onChange')}
  type="password"
  value="foobar"
  hideLabel
/>
```

Marked as optional.

```jsx
<Input name="input-optional" label="Label" onChange={debug('onChange')} optional />
```

Display with inline label.

```jsx
<Input
  name="input-optional"
  label="Label"
  labelDescription="This is a small label description."
  onChange={debug('onChange')}
  optional
  inline
/>
```
