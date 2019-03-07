```jsx
import SteppedProgressBar, { Step } from '.';

<SteppedProgressBar>
  <Step complete />
  <Step complete />
  <Step />
  <Step />
  <Step />
</SteppedProgressBar>;
```

With tooltip labels on each step.

```jsx
import SteppedProgressBar, { Step } from '.';

<SteppedProgressBar>
  <Step label="Cart" complete />
  <Step label="Checkout" complete />
  <Step label="Billing" complete />
  <Step label="Payment" />
  <Step label="Complete" />
</SteppedProgressBar>;
```
