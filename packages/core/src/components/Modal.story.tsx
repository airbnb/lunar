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
    showSmall?: boolean;
    showScrollable?: boolean;
    showSubtitle?: boolean;
    showTitle?: boolean;
  },
  { visible: boolean }
> {
  state = { visible: true };

  handleToggle = () => this.setState(prevState => ({ visible: !prevState.visible }));

  handleClose = () => this.setState({ visible: false });

  render() {
    const { visible } = this.state;
    const {
      image,
      showFluid,
      showFooter,
      showLarge,
      showSmall,
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
            scrollable={showScrollable}
            small={showSmall}
            subtitle={showSubtitle ? 'Modal Sub-Title' : undefined}
            title={showTitle ? <LoremIpsum short /> : undefined}
            onClose={this.handleClose}
          >
            <Text>
              <LoremIpsum />
              {(showLarge || !showSmall) && showScrollable && (
                <>
                  <LoremIpsum /> <LoremIpsum /> <LoremIpsum />
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
  .add('Default modal (600px)', () => <ModalDemo />)
  .add('Small modal (400px)', () => <ModalDemo showSmall />)
  .add('Large modal (800px)', () => <ModalDemo showLarge />)
  .add('Fluid modal', () => <ModalDemo showFluid />)
  .add('With title', () => <ModalDemo showTitle />)
  .add('With subtitle', () => <ModalDemo showSubtitle showTitle />)
  .add('With title and footer', () => <ModalDemo showFooter showTitle />)
  .add('Scrollable content', () => <ModalDemo showFooter showTitle showScrollable />)
  .add('Small scrollable content', () => (
    <ModalDemo showSmall showFooter showTitle showScrollable />
  ))
  .add('Large scrollable content', () => (
    <ModalDemo showLarge showFooter showTitle showScrollable />
  ))
  .add('With a right, centered image.', () => <ModalDemo showFooter showTitle image="center" />)
  .add('With a right, covered image.', () => <ModalDemo showFooter showTitle image="cover" />);
