Render a count badge.

```jsx
<CountBadge accessibilityLabel="5 unread messages" value={5} />
```

Add waggle animation.

```jsx
<CountBadge accessibilityLabel="5 unread messages" value={5} waggle />
```

Change count badge value to trigger animations.

```jsx
import Button from '../Button';
import ButtonGroup from '../ButtonGroup';

class CountController extends React.Component {
  constructor() {
    this.state = { count: 5 };
  }

  render() {
    return (
      <>
        <CountBadge
          accessibilityLabel={`${this.state.count} unread messages`}
          value={this.state.count}
        />
        <br />
        <br />
        <ButtonGroup>
          <Button small onClick={() => this.setState({ count: this.state.count + 1 })}>
            Increment badge count
          </Button>
          <Button small onClick={() => this.setState({ count: 0 })}>
            Reset badge count
          </Button>
        </ButtonGroup>
      </>
    );
  }
}

<CountController />;
```
