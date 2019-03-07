A standard link.

```jsx
<Link href="https://github.com/airbnb/lunar">Link</Link>
```

Render a `button` when no `href` is passed.

```jsx
<Link>Link</Link>
```

With different sizing: small, regular (default), and large.

```jsx
<Link href="https://github.com/airbnb/lunar" small>
  Link
</Link>{' '}
<Link href="https://github.com/airbnb/lunar">Link</Link>{' '}
<Link href="https://github.com/airbnb/lunar" large>
  Link
</Link>
```

With different states: muted, disabled, and inverted.

```jsx
<Link href="https://github.com/airbnb/lunar" muted>
  Link
</Link>{' '}
<Link href="https://github.com/airbnb/lunar" disabled>
  Link
</Link>{' '}
<Link href="https://github.com/airbnb/lunar" inverted>
  Link
</Link>
```

With before and or after icons.

```jsx
import IconAddAlt from ':icons/interface/IconAddAlt';

<div>
  <Link href="https://github.com/airbnb/lunar" beforeIcon={<IconAddAlt decorative />}>
    Link
  </Link>
  <br />
  <Link href="https://github.com/airbnb/lunar" afterIcon={<IconAddAlt decorative />}>
    Link
  </Link>
</div>;
```

Stop click and default events when disabled.

```jsx
<Link href="https://github.com/airbnb/lunar" onClick={debug('onClick')} disabled>
  Link
</Link>
```

Bold text.

```jsx
<Link href="https://github.com/airbnb/lunar" bold>
  Link
</Link>
```
