Schedules a child component to be updated at a given interval. Handles cleaning up the interval when
the component is unmounted, and schedules deferred updates for the best possible user experience.

This component does not guarantee that the function children is called at the provided interval, but
rather attempts to call it roughly within the interval, while still providing a good user
experience.

```jsx
import Text from '../Text';

const start = Date.now();

<Text>
  {/* A fast timer, to demonstrate the deferred scheduling */}
  <Interval every={100}>{now => <div>Interval last time: {now}</div>}</Interval>

  {/* A second timer */}
  <Interval every={1000}>
    {now => <div>Interval has been running for {Math.floor((now - start) / 1000)} seconds</div>}
  </Interval>
</Text>;
```
