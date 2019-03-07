Display a standard toast.

```jsx
<Toast id="foo" message="This is a message within a toast." duration={0} />
```

An error toast that has a delay before displaying.

```jsx
<Toast id="bar" message="This is a message within a toast." duration={0} delay={1000} danger />
```

A success toast with a title.

```jsx
<Toast id="baz" message="This is a message within a toast." title="Success!" duration={0} success />
```

A refresh toast denoting a new version.

```jsx
<Toast id="qux" message="This is a message within a toast." duration={0} refresh />
```
