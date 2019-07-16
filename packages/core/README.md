# Lunar

Provides core React building blocks that all other consuming packages are built around. This
includes components, composers, themes, and more.

```bash static
yarn add @airbnb/lunar
```

## Setup

Initialize the core package to apply globalization and theme-related settings.

```js static
import Core from '@airbnb/lunar';

Core.initialize({
  defaultLocale: 'en',
  defaultTimezone: 'UTC',
  logger: logToSentry,
  name: 'AppName',
});
```

> If `defaultLocale` and `defaultTimezone` are omitted, their values will be automatically detected
> from the user's browser settings.

> You should call `Core.initialize()` before importing any component that leverages `withStyles` or
> `useStyles` for theme-related settings to take effect.
