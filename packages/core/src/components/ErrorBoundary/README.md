Wrap a component in which to catch errors. The `withBoundary` composer is preferred over manual
composition.

```jsx static
import withBoundary from '@airbnb/lunar/lib/composers/withBoundary';

function Component() {
  // ...
}

export default withBoundary('ComponentName')(Component);
```
