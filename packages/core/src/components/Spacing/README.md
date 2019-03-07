Apply top margin.

```jsx
import StatusLabel from '../StatusLabel';

<Spacing top={3}>
  <StatusLabel>Content</StatusLabel>
</Spacing>;
```

Apply right margin.

```jsx
import StatusLabel from '../StatusLabel';

<Spacing right={3}>
  <StatusLabel>Content</StatusLabel>
</Spacing>;
```

Apply bottom margin.

```jsx
import StatusLabel from '../StatusLabel';

<Spacing bottom={3}>
  <StatusLabel>Content</StatusLabel>
</Spacing>;
```

Apply left margin.

```jsx
import StatusLabel from '../StatusLabel';

<Spacing left={3}>
  <StatusLabel>Content</StatusLabel>
</Spacing>;
```

Apply top and bottom (vertical) margin.

```jsx
import StatusLabel from '../StatusLabel';

<Spacing vertical={3}>
  <StatusLabel>Content</StatusLabel>
</Spacing>;
```

Apply left and right (horizontal) margin.

```jsx
import StatusLabel from '../StatusLabel';

<Spacing horizontal={3}>
  <StatusLabel>Content</StatusLabel>
</Spacing>;
```

Apply margin on all sides.

```jsx
import StatusLabel from '../StatusLabel';

<Spacing all={3}>
  <StatusLabel>Content</StatusLabel>
</Spacing>;
```

Use padding instead of margin.

```jsx
import StatusLabel from '../StatusLabel';

<Spacing all={3} inner>
  <StatusLabel>Content</StatusLabel>
</Spacing>;
```

Display inline.

```jsx
import StatusLabel from '../StatusLabel';

<div>
  <Spacing all={0.5} inline>
    <StatusLabel>Content 1</StatusLabel>
  </Spacing>
  <Spacing all={0.5} inline>
    <StatusLabel>Content 2</StatusLabel>
  </Spacing>
</div>;
```
