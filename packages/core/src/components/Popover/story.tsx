import React from 'react';
import LoremIpsum from ':storybook/components/LoremIpsum';
import { withexpandMultiple } from '../Accordion/story';
import Button from '../Button';
import Link from '../Link';
import Text from '../Text';
import Spacing from '../Spacing';
import Popover from '.';

class PopoverOnShowDemo extends React.Component<{}, { text: string; count: number }> {
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
      <Popover content={this.state.text} onShow={this.handleOnShow}>
        <Button>Hover over here</Button>
      </Popover>
    );
  }
}

export default {
  title: 'Core/Popover',
  parameters: {
    happo: false,
    inspectComponents: [Popover],
  },
};

export function displaysWhenAnElementIsHovered() {
  const content = (
    <>
      <Text>Links inside popovers are clickable!</Text>
      <Link openInNewWindow href="https://github.com/airbnb/lunar">
        Click me!
      </Link>
    </>
  );
  return (
    <div>
      <Popover content={content}>
        <Button>Hover Me</Button>
      </Popover>

      <Text inline>← Has a popover</Text>

      <Text>
        <LoremIpsum />
      </Text>

      <div style={{ textAlign: 'right' }}>
        <Text inline>Also has a popover →</Text>
        <Popover
          inverted
          content={
            <Text inverted>This uncomfortably wide Popover should have left-aligned text.</Text>
          }
          width={100}
        >
          <Button>Hover Me</Button>
        </Popover>
      </div>

      <Text>
        <LoremIpsum />
      </Text>

      <div style={{ textAlign: 'center' }}>
        <Popover content="This Popover should most definitely be centered" width={21}>
          <Button>
            Hover Me too
            <br />
            please
          </Button>
        </Popover>
      </div>
    </div>
  );
}

displaysWhenAnElementIsHovered.story = {
  name: 'Displays when an element is hovered.',
};

export function supressDismissalOnMouseDown() {
  return (
    <Popover
      remainOnMouseDown
      content={'This popover should not disappear when you click the button'}
      width={25}
    >
      <Button>Hover over here</Button>
    </Popover>
  );
}

export function expandsAndShrinksWithContent() {
  return (
    <div>
      <Popover content={withexpandMultiple()}>
        <Button>Hover Me</Button>
      </Popover>

      <Text inline>← Has a popover that can expand and collapse</Text>

      <Text>
        <LoremIpsum />
      </Text>

      <div style={{ textAlign: 'right' }}>
        <Text inline>Also has a popover that can expand and collapse →</Text>
        <Popover content={withexpandMultiple()} width={100}>
          <Button>Hover Me</Button>
        </Popover>
      </div>

      <Text>
        <LoremIpsum />
        <LoremIpsum />
        <LoremIpsum />
        <LoremIpsum />
        <LoremIpsum />
        <LoremIpsum />
      </Text>

      <div style={{ textAlign: 'center' }}>
        <Popover content={withexpandMultiple()} width={100}>
          <Button>
            Hover Me too
            <br />
            please
          </Button>
        </Popover>
      </div>
    </div>
  );
}

expandsAndShrinksWithContent.story = {
  name: 'Expands and shrinks with content.',
};

supressDismissalOnMouseDown.story = {
  name: 'Supress dismissal on mouse down.',
};

export function addAnUnderlineToTheTrigger() {
  return (
    <Text>
      <Popover underlined content="Hello">
        I have a Popover
      </Popover>
      ...
      <Popover content="Goodbye">and I have a Popover too</Popover>
    </Text>
  );
}

addAnUnderlineToTheTrigger.story = {
  name: 'Add an underline to the trigger.',
};

export function useLightBackgroundWithDarkText() {
  return (
    <Text>
      <Popover inverted content="Hello">
        I have a dark background popover
      </Popover>
      ...
      <Popover content="Goodbye">and I have the default light background popover</Popover>
    </Text>
  );
}

useLightBackgroundWithDarkText.story = {
  name: 'Use dark background with light text.',
};

export function callbackFiredWhenThePopoverIsShown() {
  return <PopoverOnShowDemo />;
}

callbackFiredWhenThePopoverIsShown.story = {
  name: 'Callback fired when the Popover is shown.',
};

export function overrideAlign() {
  return (
    <div style={{ textAlign: 'center' }}>
      <Spacing top={10}>
        <Popover
          horizontalAlign="right"
          content="This is an example of a Popover that manually overrides the align prop with the value right"
          width={40}
        >
          <Button>Horizontal align right</Button>
        </Popover>
        <Spacing inline horizontal={5}>
          <Popover
            content="This is an example of a Popover that overrides the verticalAlign value"
            verticalAlign="above"
            width={40}
          >
            <Button>Vertical align above</Button>
          </Popover>
        </Spacing>
        <Popover
          horizontalAlign="left"
          content="This is an example of a Popover that manually overrides the align prop with the value left"
          width={40}
        >
          <Button>Horizontal align left</Button>
        </Popover>
      </Spacing>
    </div>
  );
}

overrideAlign.story = {
  name: 'Manually override the align of the Popover.',
};

export function toggleWithClick() {
  return (
    <div style={{ textAlign: 'center' }}>
      <Spacing top={10}>
        <Popover toggleOnClick content="This popover's display is toggled on click." width={25}>
          <Button>Toggle on click</Button>
        </Popover>
      </Spacing>
    </div>
  );
}

toggleWithClick.story = {
  name: 'Toggle Popover on click.',
};

export function withAccessibilityLabel() {
  return (
    <>
      <Spacing bottom={1}>
        <Popover
          accessibilityLabel="Override accessibility content"
          content="I have an aria-label instead of an aria-labelledby"
        >
          I have an{' '}
          <Text bold inline>
            aria-label
          </Text>{' '}
          instead of an aria-labelledby
        </Popover>
      </Spacing>
      <Popover content="I have an aria-labelledby instead of an aria-label">
        I have an{' '}
        <Text bold inline>
          aria-labelledby
        </Text>{' '}
        instead of an aria-label
      </Popover>
    </>
  );
}

withAccessibilityLabel.story = {
  name: 'With accessibility label.',
};

export function customDelayPopover() {
  return (
    <div>
      <Popover
        content="You had to hover for 1 second before this popover appeared"
        mouseEnterDelay={1}
      >
        <Button>Hover Me</Button>
      </Popover>
      <Text inline>← This popover has `mouseEnterDelay` set to 1 second</Text>
      <div style={{ textAlign: 'center' }}>
        <Popover
          content="This popover will persist for 5 seconds if you do not move your cursor into the popover."
          mouseLeaveDelay={5}
        >
          <Button>
            Hover Me too
            <br />
            please
          </Button>
        </Popover>
        <Text inline>← This popover has `mouseLeaveDelay` set to 5 seconds</Text>
      </div>
    </div>
  );
}

customDelayPopover.story = {
  name: 'With custom mouse delay set.',
};
