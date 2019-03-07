By default, displays a loading state while requesting data.

```jsx
import Text from '../Text';

<AppLoader failureText="Failed to load application" loadingText="Loading application" fetching>
  <Text>Content</Text>
</AppLoader>;
```

Display an error when a request fails.

```jsx
import Text from '../Text';

<AppLoader
  error={new Error('404')}
  failureText="Failed to load application"
  loadingText="Loading application"
>
  <Text>Content</Text>
</AppLoader>;
```

Display the content for a successful, fetched request.

```jsx
import Text from '../Text';

<AppLoader fetched failureText="Failed to load application" loadingText="Loading application">
  <Text>Content</Text>
</AppLoader>;
```

With a subtitle.

```jsx
import Text from '../Text';

<AppLoader
  failureText="Failed to load reservation"
  loadingText="Loading reservation"
  subtitle="HMRJ5TC3HK"
>
  <Text>Content</Text>
</AppLoader>;
```

With a small heading and centered horizontally.

```jsx
import Text from '../Text';

<AppLoader
  centered
  small
  failureText="Failed to load reservation"
  loadingText="Loading reservation"
  subtitle="HMRJ5TC3HK"
>
  <Text>Content</Text>
</AppLoader>;
```
