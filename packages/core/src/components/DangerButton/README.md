A danger button with an inverted variant.

```jsx
<DangerButton>Button</DangerButton>{' '}
<DangerButton inverted>Button</DangerButton>
```

Render an anchor link when passing `href`.

```jsx
<DangerButton href="https://github.com/airbnb/lunar" openInNewWindow>
  Link
</DangerButton>{' '}
<DangerButton href="https://github.com/airbnb/lunar" openInNewWindow inverted>
  Link
</DangerButton>
```

With event handlers.

```jsx
<DangerButton
  onClick={debug('onClick')}
  onMouseOver={debug('onMouseOver')}
  onFocus={debug('onFocus')}
>
  Button
</DangerButton>
```

With different sizing: small, regular (default), and large.

```jsx
<DangerButton small>Button</DangerButton>{' '}
<DangerButton>Button</DangerButton>{' '}
<DangerButton large>Button</DangerButton>
<br /><br />
<DangerButton inverted small>
  Button
</DangerButton>{' '}
<DangerButton inverted>Button</DangerButton>{' '}
<DangerButton inverted large>
  Button
</DangerButton>
```

With different states: disabled and loading.

```jsx
<DangerButton disabled>Button</DangerButton>{' '}
<DangerButton loading>Button</DangerButton>
<br /><br />
<DangerButton inverted disabled>
  Button
</DangerButton>{' '}
<DangerButton inverted loading>
  Button
</DangerButton>
```
