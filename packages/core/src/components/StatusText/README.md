Default and status classified text.

```jsx
<StatusText>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</StatusText>
<StatusText notice>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</StatusText>
<StatusText info>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</StatusText>
<StatusText success>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</StatusText>
<StatusText warning>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</StatusText>
<StatusText danger>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</StatusText>
<StatusText muted>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</StatusText>
```

Can pass props to the underlying `Text` component.

```jsx
<StatusText notice micro>
  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
</StatusText>
<StatusText info small>
  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
</StatusText>
<StatusText success large>
  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
</StatusText>
<StatusText warning disabled>
  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
</StatusText>
<StatusText danger light>
  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
</StatusText>
<StatusText muted bold>
  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
</StatusText>
```
