A list of single select toggle buttons.

```jsx
import ButtonGroup from '../ButtonGroup';

<ToggleButtonController
  value="red"
  name="button-group-controller"
  label="Favorite color?"
  onChange={debug('onChange')}
>
  {ControlledButton => (
    <ButtonGroup>
      <ControlledButton value="red" key="red">
        Red
      </ControlledButton>
      <ControlledButton value="blue" key="blue">
        Blue
      </ControlledButton>
      <ControlledButton value="green" key="green">
        Green
      </ControlledButton>
    </ButtonGroup>
  )}
</ToggleButtonController>;
```

Handles invalid state.

```jsx
import ButtonGroup from '../ButtonGroup';

<ToggleButtonController
  value="red"
  name="button-group-controller"
  label="Favorite color?"
  onChange={debug('onChange')}
  invalid
>
  {ControlledButton => (
    <ButtonGroup>
      <ControlledButton value="red" key="red">
        Red
      </ControlledButton>
      <ControlledButton value="blue" key="blue">
        Blue
      </ControlledButton>
      <ControlledButton value="green" key="green">
        Green
      </ControlledButton>
    </ButtonGroup>
  )}
</ToggleButtonController>;
```

Handles disabled state.

```jsx
import ButtonGroup from '../ButtonGroup';

<ToggleButtonController
  value="red"
  name="button-group-controller"
  label="Favorite color?"
  onChange={debug('onChange')}
  disabled
>
  {ControlledButton => (
    <ButtonGroup>
      <ControlledButton value="red" key="red">
        Red
      </ControlledButton>
      <ControlledButton value="blue" key="blue">
        Blue
      </ControlledButton>
      <ControlledButton value="green" key="green">
        Green
      </ControlledButton>
    </ButtonGroup>
  )}
</ToggleButtonController>;
```
