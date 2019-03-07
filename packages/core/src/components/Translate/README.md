Display a message with an editor related context.

```jsx
import Text from '../Text';

<Text>
  <Translate
    phrase="This content should be translated."
    context="This message is for translation editors."
  />
</Text>;
```

Interpolate variables. Also support HTML.

```jsx
import Text from '../Text';

<Text>
  <Translate
    phrase="Hello %{name}!"
    name={<b>Bruce</b>}
    context="This message is for translation editors."
    html
  />
</Text>;
```

Handle contextual messages based on counts.

```jsx
import Text from '../Text';

<Text>
  <Translate
    phrase="%{smartCount} item||||%{smartCount} items"
    smartCount={0}
    context="This message is for translation editors."
  />
  <br />
  <br />
  <Translate
    phrase="%{smartCount} item||||%{smartCount} items"
    smartCount={1}
    context="This message is for translation editors."
  />
  <br />
  <br />
  <Translate
    phrase="%{smartCount} item||||%{smartCount} items"
    smartCount={2}
    context="This message is for translation editors."
  />
</Text>;
```

Return a string instead of rendering a component.

```jsx
Translate.phrase('Hello %{name}', { name: 'Bruce' }, 'This message is for translation editors.');
```
