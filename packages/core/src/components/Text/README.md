A basic string of text.

```jsx
<Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
```

With bold, light, and uppercased emphasis.

```jsx
<Text light>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
<Text bold>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
<Text uppercased>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
```

With different sizing: micro, small, regular (default), and large.

```jsx
<Text micro>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
<Text small>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
<Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
<Text large>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
```

With different states: muted, disabled, and inverted.

```jsx
<Text muted>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
<Text disabled>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
<Text inverted>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
```

With whitespace preserved:

```jsx
<Text preserveWhitespace>
  {'     '}
  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  {'     '}
</Text>
```

With truncated:

```jsx
<Text truncated>
  <div>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam leo erat, lacinia nec porttitor
    sed, mollis sed nibh. Nam porta sit amet risus quis interdum. Sed feugiat lorem vitae augue
    blandit, sed mollis mi laoreet. Donec auctor, enim eget tempus auctor, est lorem laoreet nisi, a
    rutrum dolor quam eget mi. Integer nibh orci, faucibus in dolor ut, maximus euismod erat. Nam
    efficitur vulputate augue non pretium. Suspendisse vitae dui elit. Aliquam erat volutpat.
    Curabitur rutrum id elit ut hendrerit. Pellentesque ullamcorper quam a nibh aliquam bibendum.
    Fusce at fermentum velit. Phasellus malesuada dapibus tincidunt.
  </div>
</Text>
```

With aligned text.

```jsx
<Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
<Text centerAlign>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
<Text endAlign>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
```
