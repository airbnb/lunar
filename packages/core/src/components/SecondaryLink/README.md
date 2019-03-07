A secondary link.

```jsx
<SecondaryLink href="https://github.com/airbnb/lunar">Link</SecondaryLink>
```

Render a `button` when no `href` is passed.

```jsx
<SecondaryLink>Link</SecondaryLink>
```

With different sizing: small, regular (default), and large.

```jsx
<SecondaryLink href="https://github.com/airbnb/lunar" small>
  Link
</SecondaryLink>{' '}
<SecondaryLink href="https://github.com/airbnb/lunar">Link</SecondaryLink>{' '}
<SecondaryLink href="https://github.com/airbnb/lunar" large>
  Link
</SecondaryLink>
```

With different states: muted, disabled, and inverted.

```jsx
<SecondaryLink href="https://github.com/airbnb/lunar" muted>
  Link
</SecondaryLink>{' '}
<SecondaryLink href="https://github.com/airbnb/lunar" disabled>
  Link
</SecondaryLink>{' '}
<SecondaryLink href="https://github.com/airbnb/lunar" inverted>
  Link
</SecondaryLink>
```

With before and or after icons.

```jsx
import IconAddAlt from ':icons/interface/IconAddAlt';

<div>
  <SecondaryLink href="https://github.com/airbnb/lunar" beforeIcon={<IconAddAlt decorative />}>
    Link
  </SecondaryLink>
  <br />
  <SecondaryLink href="https://github.com/airbnb/lunar" afterIcon={<IconAddAlt decorative />}>
    Link
  </SecondaryLink>
</div>;
```

Stop click and default events when disabled.

```jsx
<SecondaryLink href="https://github.com/airbnb/lunar" onClick={debug('onClick')} disabled>
  Link
</SecondaryLink>
```

Bold text.

```jsx
<SecondaryLink href="https://github.com/airbnb/lunar" bold>
  Link
</SecondaryLink>
```
