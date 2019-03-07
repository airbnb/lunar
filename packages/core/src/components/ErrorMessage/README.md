Display an `Error`.

```jsx
<ErrorMessage error={new Error('Something is broken!')} title="Oops" />
```

Display an API endpoint error.

```jsx
<ErrorMessage
  error={{
    error_id: 123,
    error_code: 404,
    error_message: 'Resource not found.',
  }}
/>
```
