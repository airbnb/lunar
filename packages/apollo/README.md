## Lunar Apollo

Provides out of the box support for GraphQL, powered by [Apollo](https://www.apollographql.com).

```bash static
yarn add @airbnb/lunar-apollo
```

This package relies on GraphQL related packages to also be installed.

```bash static
yarn add graphql graphql-tag
```

## Setup

Initialize the package to create an Apollo client. The following option settings may be passed to
customize this package.

- `links` (ApolloLink[]) - Collection of Apollo links (middleware) to apply to the client.

```js static
import Apollo, { HttpLink } from '@airbnb/lunar-apollo';

const httpLink = new HttpLink({
  uri: '/api/graphql',
  credentials: 'same-origin',
});

Apollo.initialize({
  links: [httpLink],
});
```

> The client can be accessed with `Apollo.getClient()`.

## Usage

Once the Apollo client has been created, we can make it available to our queries and mutations by
wrapping our application in a provider.

```jsx static
import { Provider } from '@airbnb/lunar-apollo';

function Root() {
  return (
    <Provider>
      <App />
    </Provider>
  );
}
```
