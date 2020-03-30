import React from 'react';
import LoremIpsum from ':storybook/components/LoremIpsum';
import moon from ':storybook/images/moon.png';
import Button from '../Button';
import ButtonGroup from '../ButtonGroup';
import Text from '../Text';
import Modal from '.';

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

  handleToggle = () => this.setState((prevState) => ({ visible: !prevState.visible }));

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

export default {
  title: 'Core/Modal',
  parameters: {
    inspectComponents: [Modal],
  },
};

export function defaultModal600Px() {
  return <ModalDemo />;
}

defaultModal600Px.story = {
  name: 'Default modal (600px)',
};

export function smallModal400Px() {
  return <ModalDemo showSmall />;
}

smallModal400Px.story = {
  name: 'Small modal (400px)',
};

export function largeModal800Px() {
  return <ModalDemo showLarge />;
}

largeModal800Px.story = {
  name: 'Large modal (800px)',
};

export function fluidModal() {
  return <ModalDemo showFluid />;
}

fluidModal.story = {
  name: 'Fluid modal',
};

export function withTitle() {
  return <ModalDemo showTitle />;
}

withTitle.story = {
  name: 'With title',
};

export function withSubtitle() {
  return <ModalDemo showSubtitle showTitle />;
}

withSubtitle.story = {
  name: 'With subtitle',
};

export function withTitleAndFooter() {
  return <ModalDemo showFooter showTitle />;
}

withTitleAndFooter.story = {
  name: 'With title and footer',
};

export function scrollableContent() {
  return <ModalDemo showFooter showTitle showScrollable />;
}

scrollableContent.story = {
  name: 'Scrollable content',
};

export function scrollableContentWithoutFooter() {
  return <ModalDemo showTitle showScrollable />;
}

scrollableContentWithoutFooter.story = {
  name: 'Scrollable content without footer',
};

export function smallScrollableContent() {
  return <ModalDemo showSmall showFooter showTitle showScrollable />;
}

smallScrollableContent.story = {
  name: 'Small scrollable content',
};

export function largeScrollableContent() {
  return <ModalDemo showLarge showFooter showTitle showScrollable />;
}

largeScrollableContent.story = {
  name: 'Large scrollable content',
};

export function withARightCenteredImage() {
  return <ModalDemo showFooter showTitle image="center" />;
}

withARightCenteredImage.story = {
  name: 'With a right, centered image.',
};

export function withARightCoveredImage() {
  return <ModalDemo showFooter showTitle image="cover" />;
}

withARightCoveredImage.story = {
  name: 'With a right, covered image.',
};
