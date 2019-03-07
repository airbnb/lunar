Group an arbitrary number of `Button` components.

```jsx
import Button from '../Button';

<ButtonGroup>
  <Button>One</Button>
  <Button>Two</Button>
  <Button>Three</Button>
</ButtonGroup>;
```

Stack buttons vertically.

```jsx
import Button from '../Button';

<div style={{ width: 300 }}>
  <ButtonGroup stacked>
    <Button block small>
      One
    </Button>
    <Button block>Two</Button>
    <Button block large>
      Three
    </Button>
  </ButtonGroup>
</div>;
```

Buttons wrapped in a `Tooltip`.

```jsx
import Button from '../Button';
import Tooltip from '../Tooltip';

<ButtonGroup>
  <Tooltip content="One">
    <Button>One</Button>
  </Tooltip>
  <Tooltip content="Two">
    <Button>Two</Button>
  </Tooltip>
  <Tooltip content="Three">
    <Button>Three</Button>
  </Tooltip>
</ButtonGroup>;
```
