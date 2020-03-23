import React from 'react';
import LoremIpsum from ':storybook/components/LoremIpsum';
import Text from '../Text';
import Button from '../Button';
import ButtonGroup from '../ButtonGroup';
import GradientScroller from '.';

class ButtonGroupDemo extends React.Component<{}, { buttons: number[] }> {
  state = { buttons: [] };

  handleClick = () => {
    this.setState(prevState => ({
      buttons: [...prevState.buttons, prevState.buttons.length],
    }));
  };

  render() {
    return (
      <div style={{ borderBottom: '2px solid #DBDBDB', paddingBottom: 4 }}>
        <ButtonGroup>
          <Button onClick={this.handleClick}>Add</Button>

          {this.state.buttons.map(count => (
            <Button key={count}>{count}</Button>
          ))}
        </ButtonGroup>
      </div>
    );
  }
}

export default {
  title: 'Core/GradientScroller',
  parameters: {
    inspectComponents: [GradientScroller],
    happo: { delay: 500 },
  },
};

export function aScrollableContainer() {
  return (
    <GradientScroller>
      <Text>
        <span style={{ whiteSpace: 'nowrap' }}>
          <LoremIpsum />
          <LoremIpsum />
        </span>
      </Text>
    </GradientScroller>
  );
}

aScrollableContainer.story = {
  name: 'A scrollable container.',
};

export function withLeftAndRightArrows() {
  return (
    <GradientScroller showArrows hideScrollbar>
      <Text>
        <span style={{ whiteSpace: 'nowrap' }}>
          <LoremIpsum />
          <LoremIpsum />
        </span>
      </Text>
    </GradientScroller>
  );
}

withLeftAndRightArrows.story = {
  name: 'With left and right arrows.',
};

export function withArrowsButNotShown() {
  return (
    <GradientScroller showArrows hideScrollbar>
      <Text>
        <LoremIpsum short />
      </Text>
    </GradientScroller>
  );
}

withArrowsButNotShown.story = {
  name: 'With arrows but not shown.',
};

export function withNoScrollbarAndVariableWidthChildren() {
  return (
    <GradientScroller hideScrollbar>
      <ButtonGroupDemo />
    </GradientScroller>
  );
}

withNoScrollbarAndVariableWidthChildren.story = {
  name: 'With no scrollbar and variable width children.',
  parameters: { happo: false },
};
