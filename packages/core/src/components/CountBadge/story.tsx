import React from 'react';
import Button from '../Button';
import ButtonGroup from '../ButtonGroup';
import CountBadge from '.';

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

export default {
  title: 'Core/CountBadge',
  parameters: {
    inspectComponents: [CountBadge],
  },
};

export function defaultAnimation() {
  return <CountBadge accessibilityLabel="5 unread messages" value={5} />;
}

defaultAnimation.story = {
  name: 'Default animation.',
};

export function addWaggleAnimation() {
  return <CountBadge waggle accessibilityLabel="5 unread messages" value={5} />;
}

addWaggleAnimation.story = {
  name: 'Add waggle animation.',
};

export function changeValueToTriggerAnimations() {
  return <CountExample />;
}

changeValueToTriggerAnimations.story = {
  name: 'Change value to trigger animations.',
};
