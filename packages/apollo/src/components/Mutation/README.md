Execute a GraphQL mutation and handle the response when received. Will automatically handle loading
and error states.

```jsx static
<Mutation
  query={gql`
    mutation updateUserName($id: ID!, $name: String!) {
      updateUser(id: $id, name: $name) {
        id
        name
      }
    }
  `}
>
  {updateUser => (
    <button
      onClick={() => {
        updateUser({
          variables: {
            id: 123,
            name: 'Lunar',
          },
        });
      }}
    >
      Update
    </button>
  )}
</Mutation>
```

Display a custom loading component.

```jsx static
<Mutation loading={<Shimmer />} />
```

Display a custom error. Supports either a render function or an element.

```jsx static
<Mutation error={error => <Failure error={error} />} />
// Or
<Mutation error={<Failure />} />
```
