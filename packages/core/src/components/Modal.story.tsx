import React from 'react';
import { storiesOf } from '@storybook/react';
import moon from ':image/moon.png';
import Button from './Button';
import ButtonGroup from './ButtonGroup';
import Spacing from './Spacing';
import Tooltip from './Tooltip';
import Text from './Text';
import Modal from './Modal';

class ModalDemo extends React.Component<
  { large?: boolean; noTitle?: boolean; image?: 'center' | 'cover' },
  { visible: boolean }
> {
  state = { visible: false };

  handleToggle = () => this.setState(prevState => ({ visible: !prevState.visible }));

  handleClose = () => this.setState({ visible: false });

  render() {
    const { visible } = this.state;
    const { image, large, noTitle } = this.props;

    return (
      <div>
        <Button onClick={this.handleToggle}>Open standard modal</Button>

        {visible && (
          <Modal
            image={
              image && {
                type: image,
                url: moon,
              }
            }
            large={large}
            footer={
              <ButtonGroup>
                <Button onClick={this.handleToggle}>OK</Button>
                <Button inverted onClick={this.handleToggle}>
                  Cancel
                </Button>
              </ButtonGroup>
            }
            onClose={this.handleClose}
            title={noTitle ? undefined : 'Modal Title'}
          >
            <div>
              <Text>
                <div>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam leo erat, lacinia nec
                  porttitor sed, mollis sed nibh. Nam porta sit amet risus quis interdum. Sed
                  feugiat lorem vitae augue blandit, sed mollis mi laoreet. Donec auctor, enim eget
                  tempus auctor, est lorem laoreet nisi, a rutrum dolor quam eget mi. Integer nibh
                  orci, faucibus in dolor ut, maximus euismod erat. Nam efficitur vulputate augue
                  non pretium. Suspendisse vitae dui elit. Aliquam erat volutpat. Curabitur rutrum
                  id elit ut hendrerit. Pellentesque ullamcorper quam a nibh aliquam bibendum. Fusce
                  at fermentum velit. Phasellus malesuada dapibus tincidunt.
                </div>
              </Text>

              <Spacing top={2}>
                <Tooltip
                  content="Tooltips are an anti-pattern! Please think carefully about accessibility before using them. Do not use tooltips for content that cannot be discovered by other means."
                  remainOnMouseDown
                >
                  <Button>Hover Me</Button>
                </Tooltip>
              </Spacing>
            </div>
          </Modal>
        )}
      </div>
    );
  }
}

storiesOf('Core/Modal', module)
  .add('A standard modal.', () => <ModalDemo />)
  .add('As large.', () => <ModalDemo large />)
  .add('With no title.', () => <ModalDemo noTitle />)
  .add('With a centered image.', () => <ModalDemo image="center" />)
  .add('With a right cover image.', () => <ModalDemo image="cover" />);
