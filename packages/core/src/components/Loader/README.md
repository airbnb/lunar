Display a loader absolutely centered within a parent.

```jsx
<div style={{ height: 100, position: 'relative' }}>
  <Loader />
</div>
```

Display a loader inline.

```jsx
import Text from '../Text';

<Text>
  Lorem ipsum. <Loader inline /> Dolor sit amet.
</Text>;
```

With a larger size positioned statically.

```jsx
<Loader static large />
```
