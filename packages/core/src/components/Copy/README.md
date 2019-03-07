Copy a string of text to the clipboard.

```jsx
<Copy text="This string has been copied." />
```

With a custom prompt message.

```jsx
<Copy text="This string has been copied." prompt="Yo copy me..." />
```

With a custom element to trigger the copy.

```jsx
import Button from '../Button';

<Copy text="This string has been copied.">
  <Button>Copy me!</Button>
</Copy>;
```
