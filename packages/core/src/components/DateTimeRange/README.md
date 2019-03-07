Different day range.

```jsx
const date = new Date();
date.setDate(date.getDate() - 1);

<DateTimeRange from={date} to={Date.now()} />;
```

Different weeks range.

```jsx
const date = new Date();
date.setDate(date.getDate() - 14);

<DateTimeRange from={date} to={Date.now()} />;
```

Different months range.

```jsx
const date = new Date();
date.setMonth(date.getMonth() - 3);

<DateTimeRange from={date} to={Date.now()} />;
```

Different years range with custom separator.

```jsx
const date = new Date();
date.setFullYear(date.getFullYear() - 2);

<DateTimeRange from={date} to={Date.now()} separator=" ~ " />;
```
