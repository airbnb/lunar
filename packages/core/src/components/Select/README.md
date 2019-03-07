A standard select field.

```jsx
<Select name="select-basic" label="Label" onChange={debug('onChange')}>
  <option value="foo">Foo</option>
  <option value="bar" disabled>
    Bar
  </option>
  <option value="baz">Baz</option>
</Select>
```

With a compact smaller view.

```jsx
<Select name="select-compact" label="Compact" onChange={debug('onChange')} compact>
  <option value="foo">Foo</option>
  <option value="bar" disabled>
    Bar
  </option>
  <option value="baz">Baz</option>
</Select>

<Select name="select-regular" label="Regular" onChange={debug('onChange')}>
  <option value="foo">Foo</option>
  <option value="bar" disabled>
    Bar
  </option>
  <option value="baz">Baz</option>
</Select>
```

With an error message in an invalid state.

```jsx
<Select
  name="select-error"
  label="Label"
  onChange={debug('onChange')}
  errorMessage="This field is required."
  invalid
>
  <option value="foo">Foo</option>
  <option value="bar" disabled>
    Bar
  </option>
  <option value="baz">Baz</option>
</Select>
```

With a label description in a disabled state.

```jsx
<Select
  name="select-disabled"
  label="Label"
  labelDescription="This is a small label description."
  onChange={debug('onChange')}
  disabled
>
  <option value="foo">Foo</option>
  <option value="bar" disabled>
    Bar
  </option>
  <option value="baz">Baz</option>
</Select>
```

With a hidden label and a placeholder.

```jsx
<Select
  name="select-custom"
  label="Label"
  onChange={debug('onChange')}
  hideLabel
  placeholder="Select an option"
>
  <option value="foo">Foo</option>
  <option value="bar" disabled>
    Bar
  </option>
  <option value="baz">Baz</option>
</Select>
```

Marked as optional.

```jsx
<Select name="select-optional" label="Label" onChange={debug('onChange')} optional>
  <option value="foo">Foo</option>
  <option value="bar" disabled>
    Bar
  </option>
  <option value="baz">Baz</option>
</Select>
```

Display with inline label.

```jsx
<Select name="select-optional" label="Label" onChange={debug('onChange')} optional inline>
  <option value="foo">Foo</option>
  <option value="bar" disabled>
    Bar
  </option>
  <option value="baz">Baz</option>
</Select>
```
