Render a micro timestamp.

```jsx
<DateTime at={Date.now()} micro />
```

Render a short timestamp.

```jsx
<DateTime at={Date.now()} short />
```

Render a medium timestamp.

```jsx
<DateTime at={Date.now()} medium />
```

Render a long timestamp.

```jsx
<DateTime at={Date.now()} long />
```

Render a relative timestamp.

```jsx
const future = new Date();
future.setDate(future.getDate() + 12);

<DateTime at={future} relative />;
```

Render a long timestamp without time.

```jsx
<DateTime at={Date.now()} long noTime noTimezone />
```

Render a custom format.

```jsx
<DateTime at={Date.now()} format="MM/dd/yyyy" />
```

Using static method to get a string.

```jsx
<div>{DateTime.format({ at: Date.now(), long: true })}</div>
```
