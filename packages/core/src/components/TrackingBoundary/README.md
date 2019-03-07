The `TrackingBoundary` is used in generating a unique context stack for `click` and `keydown`
events. Each time an event occurs within the boundary, the `name` of the component is injected into
the stack, providing a full trace once the event propagates to the root. At this point, the context,
event, and relevant data are available for consumption, primarily within `Heartbeat`.

There are 2 ways to use the boundary, the first by wrapping with `TrackingBoundary`, and the other
by using `withBoundary`.

```jsx static
// Wrapping manually
import TrackingBoundary from '@airbnb/lunar/lib/components/TrackingBoundary';

<TrackingBoundary name="ReservationsTable">
  <Table />
</TrackingBoundary>;
```

```jsx static
// Wrapping with an HOC
import withBoundary from '@airbnb/lunar/lib/composers/withBoundary';

export default withBoundary('Table')(Table);

<Table trackingName="ReservationsTable" />;
```
