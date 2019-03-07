Execute a GraphQL query and render the response when received. Will automatically handle loading and
error states.

```jsx static
<Query
  query={gql`
    query getUserByID($id: ID!) {
      user(id: $id) {
        id
        name
      }
    }
  `}
  variables={{ id: 123 }}
>
  {user => <User user={user} />}
</Query>
```

Display a custom loading component.

```jsx static
<Query loading={<Shimmer />} />
```

Display a custom error. Supports either a render function or an element.

```jsx static
<Query error={error => <Failure error={error} />} />
// Or
<Query error={<Failure />} />
```
