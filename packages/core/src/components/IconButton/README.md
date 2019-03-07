A standard button, with different sizes.

```jsx
import IconCheck from ':icons/interface/IconCheck';

<div>
  <IconButton onClick={debug('onClick')}>
    <IconCheck />
  </IconButton>
  <br />
  <br />
  <IconButton onClick={debug('onClick')}>
    <IconCheck size="2em" />
  </IconButton>
</div>;
```

Render an anchor link when passing `href`.

```jsx
import IconCheck from ':icons/interface/IconCheck';

<IconButton onClick={debug('onClick')} href="https://github.com/airbnb/lunar" openInNewWindow>
  <IconCheck />
</IconButton>;
```

Wrapped in a tooltip.

```jsx
import IconCheck from ':icons/interface/IconCheck';

<IconButton onClick={debug('onClick')} tooltip="This does something cool.">
  <IconCheck />
</IconButton>;
```

With a disabled state.

```jsx
import IconCheck from ':icons/interface/IconCheck';

<IconButton onClick={debug('onClick')} disabled>
  <IconCheck />
</IconButton>;
```
