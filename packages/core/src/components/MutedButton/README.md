A muted button with an inverted variant.

```jsx
<MutedButton>Button</MutedButton>{' '}
<MutedButton inverted>Button</MutedButton>
```

Render an anchor link when passing `href`.

```jsx
<MutedButton href="https://github.com/airbnb/lunar" openInNewWindow>
  Link
</MutedButton>{' '}
<MutedButton
  href="https://github.com/airbnb/lunar"
  openInNewWindow
  inverted
>
  Link
</MutedButton>
```

With event handlers.

```jsx
<MutedButton
  onClick={debug('onClick')}
  onMouseOver={debug('onMouseOver')}
  onFocus={debug('onFocus')}
>
  Button
</MutedButton>
```

With different sizing: small, regular (default), and large.

```jsx
<MutedButton small>Button</MutedButton>{' '}
<MutedButton>Button</MutedButton>{' '}
<MutedButton large>Button</MutedButton>
<br /><br />
<MutedButton inverted small>
  Button
</MutedButton>{' '}
<MutedButton inverted>Button</MutedButton>{' '}
<MutedButton inverted large>
  Button
</MutedButton>
```

With different states: disabled and loading.

```jsx
<MutedButton disabled>Button</MutedButton>{' '}
<MutedButton loading>Button</MutedButton>
<br /><br />
<MutedButton inverted disabled>
  Button
</MutedButton>{' '}
<MutedButton inverted loading>
  Button
</MutedButton>
```
