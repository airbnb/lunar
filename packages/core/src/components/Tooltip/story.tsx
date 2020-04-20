import React from 'react';
import LoremIpsum from ':storybook/components/LoremIpsum';
import Button from '../Button';
import Text from '../Text';
import Spacing from '../Spacing';
import Tooltip from '.';

class TooltipDemo extends React.Component<{}, { text: string; clicked: boolean }> {
  state = { text: 'click it!', clicked: false };

  handleMouseLeave = () => {
    if (this.state.clicked) {
      this.setState({
        text: 'try again',
        clicked: false,
      });
    }
  };

  handleClick = () => {
    this.setState({
      text: `clicked at ${Date.now()}`,
      clicked: true,
    });
  };

  render() {
    return (
      <Tooltip remainOnMouseDown content={this.state.text} width={20}>
        <Button onClick={this.handleClick} onMouseLeave={this.handleMouseLeave}>
          Hover over here
        </Button>
      </Tooltip>
    );
  }
}

class TooltipOnCloseDemo extends React.Component<{}> {
  state = { text: 'Closed' };

  handleOnShow = () => {
    this.setState({
      text: 'Open',
    });
  };

  handleOnClose = () => {
    this.setState({
      text: 'Closed',
    });
  };

  render() {
    return (
      <div style={{ textAlign: 'center' }}>
        <Spacing top={10}>
          <Tooltip
            content="Tooltip"
            verticalAlign="above"
            onClose={this.handleOnClose}
            onShow={this.handleOnShow}
          >
            <Button>Hover me</Button>
          </Tooltip>
          <Text>The tooltip is {this.state.text}</Text>
        </Spacing>
      </div>
    );
  }
}

class TooltipOnShowDemo extends React.Component<{}, { text: string; count: number }> {
  state = { text: 'Hovered 0 times', count: 0 };

  handleOnShow = () => {
    const { count } = this.state;

    this.setState({
      text: `Hovered ${count} times`,
      count: count + 1,
    });
  };

  render() {
    return (
      <Tooltip content={this.state.text} onShow={this.handleOnShow}>
        <Button>Hover over here</Button>
      </Tooltip>
    );
  }
}

export default {
  title: 'Core/Tooltip',
  parameters: {
    happo: false,
    inspectComponents: [Tooltip],
  },
};

export function displaysWhenAnElementIsHovered() {
  return (
    <div>
      <Tooltip content="Tooltips are an anti-pattern! Please think carefully about accessibility before using them. Do not use tooltips for content that cannot be discovered by other means.">
        <Button>Hover Me</Button>
      </Tooltip>

      <Text inline>← Has a tooltip</Text>

      <Text>
        <LoremIpsum />
      </Text>

      <div style={{ textAlign: 'right' }}>
        <Text inline>Also has a tooltip →</Text>
        <Tooltip
          inverted
          content={
            <Text inverted>
              This uncomfortably wide tooltip should have a right-notch
              <br />
              and left-aligned text.
            </Text>
          }
          width={100}
        >
          <Button>Hover Me</Button>
        </Tooltip>
      </div>

      <Text>
        <LoremIpsum />
      </Text>

      <div style={{ textAlign: 'center' }}>
        <Tooltip content="This tooltip should most definitely be centered" width={20}>
          <Button>
            Hover Me too
            <br />
            please
          </Button>
        </Tooltip>
      </div>
    </div>
  );
}

displaysWhenAnElementIsHovered.story = {
  name: 'Displays when an element is hovered.',
};

export function supressDismissalOnMouseDown() {
  return <TooltipDemo />;
}

supressDismissalOnMouseDown.story = {
  name: 'Supress dismissal on mouse down.',
};

export function addAnUnderlineToTheTrigger() {
  return (
    <Text>
      <Tooltip underlined content="Hello">
        I have a tooltip
      </Tooltip>
      ...
      <Tooltip content="Goodbye">and I have a tooltip too</Tooltip>
    </Text>
  );
}

addAnUnderlineToTheTrigger.story = {
  name: 'Add an underline to the trigger.',
};

export function useLightBackgroundWithDarkText() {
  return (
    <Text>
      <Tooltip inverted content="Hello">
        I have a dark background tooltip
      </Tooltip>
      ...
      <Tooltip content="Goodbye">and I have the default light background tooltip</Tooltip>
    </Text>
  );
}

useLightBackgroundWithDarkText.story = {
  name: 'Use dark background with light text.',
};

export function callbackFiredWhenTheTooltipIsShown() {
  return <TooltipOnShowDemo />;
}

callbackFiredWhenTheTooltipIsShown.story = {
  name: 'Callback fired when the tooltip is shown.',
};

export function overrideAlign() {
  return (
    <div style={{ textAlign: 'center' }}>
      <Spacing top={10}>
        <Tooltip
          horizontalAlign="right"
          content="This is an example of a tooltip that manually overrides the align prop with the value right"
          width={40}
        >
          <Button>Horizontal align right</Button>
        </Tooltip>
        <Spacing inline horizontal={5}>
          <Tooltip
            content="This is an example of a tooltip that overrides the verticalAlign value"
            verticalAlign="above"
            width={40}
          >
            <Button>Vertical align above</Button>
          </Tooltip>
        </Spacing>
        <Tooltip
          horizontalAlign="left"
          content="This is an example of a tooltip that manually overrides the align prop with the value left"
          width={40}
        >
          <Button>Horizontal align left</Button>
        </Tooltip>
      </Spacing>
    </div>
  );
}

overrideAlign.story = {
  name: 'Manually override the align of the tooltip',
};

export function toggleWithClick() {
  return (
    <div style={{ textAlign: 'center' }}>
      <Spacing top={10}>
        <Tooltip toggleOnClick content="This tooltip's display is toggled on click.">
          <Button>Toggle on click</Button>
        </Tooltip>
      </Spacing>
    </div>
  );
}

toggleWithClick.story = {
  name: 'Toggle tooltip on click',
};

export function handleOnClose() {
  return <TooltipOnCloseDemo />;
}

handleOnClose.story = {
  name: 'Callback fired when tooltip is shown and closed',
};

export function withAccessibilityLabel() {
  return (
    <>
      <Spacing bottom={1}>
        <Tooltip
          accessibilityLabel="Override accessibility content"
          content="I have an aria-label instead of an aria-labelledby"
        >
          I have an{' '}
          <Text bold inline>
            aria-label
          </Text>{' '}
          instead of an aria-labelledby
        </Tooltip>
      </Spacing>
      <Tooltip content="I have an aria-labelledby instead of an aria-label">
        I have an{' '}
        <Text bold inline>
          aria-labelledby
        </Text>{' '}
        instead of an aria-label
      </Tooltip>
    </>
  );
}

withAccessibilityLabel.story = {
  name: 'With accessibility label',
};
