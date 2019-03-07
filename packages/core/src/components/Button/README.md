A standard button with an inverted variant.

```jsx
<Button>Button</Button>{' '}
<Button inverted>Button</Button>
```

Render an anchor link when passing `href`.

```jsx
<Button href="https://github.com/airbnb/lunar" openInNewWindow>
  Link
</Button>{' '}
<Button href="https://github.com/airbnb/lunar" openInNewWindow inverted>
  Link
</Button>
```

With event handlers.

```jsx
<Button onClick={debug('onClick')} onMouseOver={debug('onMouseOver')} onFocus={debug('onFocus')}>
  Button
</Button>
```

With different sizing: small, regular (default), and large.

```jsx
<Button small>Button</Button>{' '}
<Button>Button</Button>{' '}
<Button large>Button</Button>
<br /><br />
<Button inverted small>
  Button
</Button>{' '}
<Button inverted>Button</Button>{' '}
<Button inverted large>
  Button
</Button>
```

With different states: disabled and loading.

```jsx
<Button disabled>Button</Button>{' '}
<Button loading>Button</Button>
<br /><br />
<Button inverted disabled>
  Button
</Button>{' '}
<Button inverted loading>
  Button
</Button>
```

With before and or after icons.

```jsx
import IconAddAlt from ':icons/interface/IconAddAlt';

<div>
  <Button beforeIcon={<IconAddAlt decorative />}>Before icon</Button>{' '}
  <Button afterIcon={<IconAddAlt decorative />}>After icon</Button>
</div>;
```

With borderless.

```jsx
<div>
  <Button borderless>Button</Button>{' '}
  <Button borderless inverted>
    Button
  </Button>{' '}
  <Button borderless disabled>
    Button
  </Button>
</div>
```
