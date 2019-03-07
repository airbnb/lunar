Breadcrumbs with `highlighted` and optional `href` or `onClick`.

```jsx
import Breadcrumbs from '.';
import Breadcrumb from './Breadcrumb';

<Breadcrumbs accessibilityLabel="Breadcrumb">
  <Breadcrumb label="Galaxy" href="#cool" />
  <Breadcrumb label="Milky Way" onClick={debug('onClick')} />
  <Breadcrumb highlighted selected label="Solar System" />
</Breadcrumbs>;
```

Breadcrumbs with `disabled` and `hideIcon` on last breadcrumb.

```jsx
import Breadcrumbs from '.';
import Breadcrumb from './Breadcrumb';

<Breadcrumbs accessibilityLabel="Progress">
  <Breadcrumb label="Step 1" onClick={debug('onClick')} />
  <Breadcrumb selected label="Step 2" />
  <Breadcrumb disabled hideIcon label="Step 3" />
</Breadcrumbs>;
```
