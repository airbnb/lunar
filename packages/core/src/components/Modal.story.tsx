import React from 'react';
import { storiesOf } from '@storybook/react';
import LoremIpsum from ':storybook/components/LoremIpsum';
import moon from ':storybook/images/moon.png';
import Button from './Button';
import ButtonGroup from './ButtonGroup';
import Text from './Text';
import Modal from './Modal';

class ModalDemo extends React.Component<
  {
    image?: 'center' | 'cover';
    showFluid?: boolean;
    showFooter?: boolean;
    showLarge?: boolean;
    showMedium?: boolean;
    showScrollable?: boolean;
    showSubtitle?: boolean;
    showTitle?: boolean;
  },
  { visible: boolean }
> {
  state = { visible: false };

  handleToggle = () => this.setState(prevState => ({ visible: !prevState.visible }));

  handleClose = () => this.setState({ visible: false });

  render() {
    const { visible } = this.state;
    const {
      image,
      showFluid,
      showFooter,
      showLarge,
      showMedium,
      showScrollable,
      showSubtitle,
      showTitle,
    } = this.props;

    return (
      <div>
        <Button onClick={this.handleToggle}>Open modal</Button>

        <br />
        <br />

        {image && <Text>(May need to resize your browser to view the example)</Text>}

        {visible && (
          <Modal
            fluid={showFluid}
            footer={
              showFooter && (
                <ButtonGroup>
                  <Button onClick={this.handleToggle}>OK</Button>
                  <Button inverted onClick={this.handleToggle}>
                    Cancel
                  </Button>
                </ButtonGroup>
              )
            }
            image={
              image && {
                type: image,
                url: moon,
              }
            }
            large={showLarge}
            medium={showMedium}
            scrollable={showScrollable}
            subtitle={showSubtitle ? 'Modal Sub-Title' : undefined}
            title={showTitle ? 'Modal Title' : undefined}
            onClose={this.handleClose}
          >
            <Text>
              <LoremIpsum />
              {(showLarge || showMedium) && showScrollable && (
                <>
                  <LoremIpsum /> <LoremIpsum />
                </>
              )}
            </Text>
          </Modal>
        )}
      </div>
    );
  }
}

storiesOf('Core/Modal', module)
  .addParameters({
    inspectComponents: [Modal],
  })
  .add('A minimum modal (400px)', () => <ModalDemo />)
  .add('A medium modal (600px)', () => <ModalDemo showMedium showTitle />)
  .add('A large modal (800px)', () => <ModalDemo showLarge showTitle />)
  .add('A fluid modal', () => <ModalDemo showFluid showTitle />)
  .add('With title', () => <ModalDemo showTitle />)
  .add('With title and footer', () => <ModalDemo showFooter showTitle />)
  .add('With subtitle', () => <ModalDemo showSubtitle showTitle />)
  .add('Minimum scrollable content', () => <ModalDemo showFooter showTitle showScrollable />)
  .add('Medium scrollable content', () => (
    <ModalDemo showMedium showFooter showTitle showScrollable />
  ))
  .add('Large scrollable content', () => (
    <ModalDemo showLarge showFooter showTitle showScrollable />
  ))
  .add('With a right, centered image.', () => <ModalDemo showFooter showTitle image="center" />)
  .add('With a right, covered image.', () => <ModalDemo showFooter showTitle image="cover" />);
