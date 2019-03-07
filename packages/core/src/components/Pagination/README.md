No previous or next pages:

```jsx
<Pagination page={1} onNext={debug('onNext')} onPrevious={debug('onPrevious')} />
```

Next pages:

```jsx
<Pagination hasNext page={1} onNext={debug('onNext')} onPrevious={debug('onPrevious')} />
```

Previous pages:

```jsx
<Pagination hasPrev page={2} onNext={debug('onNext')} onPrevious={debug('onPrevious')} />
```

Both next and pages:

```jsx
<Pagination hasPrev hasNext page={2} onNext={debug('onNext')} onPrevious={debug('onPrevious')} />
```

Bookends, first page:

```jsx
<Pagination
  hasNext
  showBookends
  onFirst={debug('onFirst')}
  onLast={debug('onLast')}
  onNext={debug('onNext')}
  onPrevious={debug('onPrevious')}
  page={1}
  pageCount={3}
/>
```

Bookends, last page:

```jsx
<Pagination
  hasPrev
  showBookends
  onFirst={debug('onFirst')}
  onLast={debug('onLast')}
  onNext={debug('onNext')}
  onPrevious={debug('onPrevious')}
  page={3}
  pageCount={3}
/>
```

Bookends, middle page:

```jsx
<Pagination
  hasNext
  hasPrev
  showBookends
  onFirst={debug('onFirst')}
  onLast={debug('onLast')}
  onNext={debug('onNext')}
  onPrevious={debug('onPrevious')}
  page={2}
  pageCount={3}
/>
```
