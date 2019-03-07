Using a centralized controller, manage changed and checked logic across multiple `CheckBox`es. The
controller generates a unique `CheckBox` component in which the following props are automatically
handled: `name`, `id`, `checked`, `disabled`, `invalid`, `optional`, and `onChange`.

```jsx
<CheckBoxController
  label="Favorite colors?"
  name="color"
  value={['green']}
  onChange={debug('onChange')}
  optional
>
  {CheckBox => (
    <div>
      <CheckBox label="❤️ Red" value="red" />
      <CheckBox label="💙 Blue" value="blue" />
      <CheckBox label="💚 Green" value="green" />
    </div>
  )}
</CheckBoxController>
```

Handles invalid state, with no spacing.

```jsx
<CheckBoxController
  label="Favorite colors?"
  name="color"
  value={['green']}
  onChange={debug('onChange')}
  invalid
>
  {CheckBox => (
    <div>
      <CheckBox label="❤️ Red" value="red" noSpacing />
      <CheckBox label="💙 Blue" value="blue" noSpacing />
      <CheckBox label="💚 Green" value="green" noSpacing />
    </div>
  )}
</CheckBoxController>
```

Handles disabled state, with no spacing.

```jsx
<CheckBoxController
  label="Favorite colors?"
  name="color"
  value={['green']}
  onChange={debug('onChange')}
  disabled
>
  {CheckBox => (
    <div>
      <CheckBox label="❤️ Red" value="red" noSpacing />
      <CheckBox label="💙 Blue" value="blue" noSpacing />
      <CheckBox label="💚 Green" value="green" noSpacing />
    </div>
  )}
</CheckBoxController>
```
