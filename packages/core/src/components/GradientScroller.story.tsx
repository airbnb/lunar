import React from 'react';
import { storiesOf } from '@storybook/react';
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
          <div>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam leo erat, lacinia nec
            porttitor sed, mollis sed nibh. Nam porta sit amet risus quis interdum. Sed feugiat
            lorem vitae augue blandit, sed mollis mi laoreet. Donec auctor, enim eget tempus auctor,
            est lorem laoreet nisi, a rutrum dolor quam eget mi. Integer nibh orci, faucibus in
            dolor ut, maximus euismod erat. Nam efficitur vulputate augue non pretium. Suspendisse
            vitae dui elit. Aliquam erat volutpat. Curabitur rutrum id elit ut hendrerit.
            Pellentesque ullamcorper quam a nibh aliquam bibendum. Fusce at fermentum velit.
            Phasellus malesuada dapibus tincidunt.
          </div>
        </span>
      </Text>
    </GradientScroller>
  ))
  .add('With left and right arrows.', () => (
    <GradientScroller showArrows hideScrollbar>
      <Text>
        <span style={{ whiteSpace: 'nowrap' }}>
          <div>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam leo erat, lacinia nec
            porttitor sed, mollis sed nibh. Nam porta sit amet risus quis interdum. Sed feugiat
            lorem vitae augue blandit, sed mollis mi laoreet. Donec auctor, enim eget tempus auctor,
            est lorem laoreet nisi, a rutrum dolor quam eget mi. Integer nibh orci, faucibus in
            dolor ut, maximus euismod erat. Nam efficitur vulputate augue non pretium. Suspendisse
            vitae dui elit. Aliquam erat volutpat. Curabitur rutrum id elit ut hendrerit.
            Pellentesque ullamcorper quam a nibh aliquam bibendum. Fusce at fermentum velit.
            Phasellus malesuada dapibus tincidunt.
          </div>
        </span>
      </Text>
    </GradientScroller>
  ))
  .add('With no scrollbar and variable width children.', () => (
    <GradientScroller hideScrollbar>
      <ButtonGroupDemo />
    </GradientScroller>
  ));
