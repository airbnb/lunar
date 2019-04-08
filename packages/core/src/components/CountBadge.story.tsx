import React from 'react';
import { storiesOf } from '@storybook/react';
import Button from './Button';
import ButtonGroup from './ButtonGroup';
import CountBadge from './CountBadge';

class CountExample extends React.Component<{}, { count: number }> {
  state = { count: 5 };

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
          <Button
            small
            onClick={() => this.setState(prevState => ({ count: prevState.count + 1 }))}
          >
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

storiesOf('Core/CountBadge', module)
  .add('Default animation.', () => <CountBadge accessibilityLabel="5 unread messages" value={5} />)
  .add('Add waggle animation.', () => (
    <CountBadge accessibilityLabel="5 unread messages" value={5} waggle />
  ))
  .add('Change value to trigger animations.', () => <CountExample />);
