import React from 'react';
import { storiesOf } from '@storybook/react';
import Button from './Button';
import Text from './Text';
import NotchedBox from './NotchedBox';
import Overlay from './Overlay';

type State = { open: boolean };

class OverlayDemo extends React.Component<{}, State> {
  state = { open: false };

  handleToggle = () => this.setState(prevState => ({ open: !prevState.open }));

  render() {
    return (
      <div>
        <Button onClick={this.handleToggle}>Open overlay</Button>

        <Overlay open={this.state.open} onClose={this.handleToggle}>
          <div style={{ width: 400, backgroundColor: 'white', padding: 10 }}>
            <Text>
              <div>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam leo erat, lacinia nec
                porttitor sed, mollis sed nibh. Nam porta sit amet risus quis interdum. Sed feugiat
                lorem vitae augue blandit, sed mollis mi laoreet. Donec auctor, enim eget tempus
                auctor, est lorem laoreet nisi, a rutrum dolor quam eget mi. Integer nibh orci,
                faucibus in dolor ut, maximus euismod erat. Nam efficitur vulputate augue non
                pretium. Suspendisse vitae dui elit. Aliquam erat volutpat. Curabitur rutrum id elit
                ut hendrerit. Pellentesque ullamcorper quam a nibh aliquam bibendum. Fusce at
                fermentum velit. Phasellus malesuada dapibus tincidunt.
              </div>
            </Text>
          </div>
        </Overlay>
      </div>
    );
  }
}

class OverlayNoBgDemo extends React.Component<{}, State> {
  state = { open: false };

  handleToggle = () => this.setState(prevState => ({ open: !prevState.open }));

  render() {
    return (
      <div style={{ overflowY: 'scroll', height: 200 }}>
        <Text>When scrolling of any parent occurs, the overlay should close</Text>

        <div style={{ margin: '10px 0' }}>
          <Button onClick={this.handleToggle}>Open overlay</Button>

          <Overlay open={this.state.open} onClose={this.handleToggle} noBackground>
            <div style={{ width: 200, marginTop: 2 }}>
              <NotchedBox>
                <Text>Hello World</Text>
              </NotchedBox>
            </div>
          </Overlay>
        </div>

        <Text>
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
        </Text>
      </div>
    );
  }
}

storiesOf('Core/Overlay', module)
  .add('An overlay with visible dark background.', () => <OverlayDemo />)
  .add('With no background.', () => <OverlayNoBgDemo />);
