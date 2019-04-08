import React from 'react';
import { storiesOf } from '@storybook/react';
import LoremIpsum from ':storybook/components/LoremIpsum';
import Text from './Text';
import Button from './Button';
import ButtonGroup from './ButtonGroup';
import GradientScroller from './GradientScroller';

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

storiesOf('Core/GradientScroller', module)
  .add('A scrollable container.', () => (
    <GradientScroller>
      <Text>
        <span style={{ whiteSpace: 'nowrap' }}>
          <LoremIpsum />
        </span>
      </Text>
    </GradientScroller>
  ))
  .add('With left and right arrows.', () => (
    <GradientScroller showArrows hideScrollbar>
      <Text>
        <span style={{ whiteSpace: 'nowrap' }}>
          <LoremIpsum />
        </span>
      </Text>
    </GradientScroller>
  ))
  .add('With no scrollbar and variable width children.', () => (
    <GradientScroller hideScrollbar>
      <ButtonGroupDemo />
    </GradientScroller>
  ));
