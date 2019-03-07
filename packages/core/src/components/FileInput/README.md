A standard file upload field.

```jsx
<FileInput name="input-basic" label="Label" onChange={debug('onChange')} />
```

Supports multiple files, of image only, while hiding file preview columns.

```jsx
<FileInput
  name="input-multiple"
  label="Label"
  onChange={debug('onChange')}
  onlyImages
  multiple
  hideFileType
  hideLastModified
/>
```

With a compact smaller view, only supporting audio and video.

```jsx
<FileInput name="input-compact" label="Compact"  onChange={debug('onChange')} onlyAudio compact />
<FileInput name="input-regular" label="Regular"  onChange={debug('onChange')} onlyVideo />
```

With an error message in an invalid state.

```jsx
<FileInput
  name="input-error"
  label="Label"
  onChange={debug('onChange')}
  errorMessage="This field is required."
  invalid
/>
```

With a label description in a disabled state.

```jsx
<FileInput
  name="input-disabled"
  label="Label"
  labelDescription="This is a small label description."
  onChange={debug('onChange')}
  disabled
/>
```

Marked as optional.

```jsx
<FileInput name="input-optional" label="Label" onChange={debug('onChange')} optional />
```

Display with inline label (does not display file table).

```jsx
<FileInput
  name="input-optional"
  label="Label"
  labelDescription="This is a small label description."
  onChange={debug('onChange')}
  optional
  inline
/>
```
