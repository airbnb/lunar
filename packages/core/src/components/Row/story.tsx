import React from 'react';
import IconAddAlt from '@airbnb/lunar-icons/lib/interface/IconAddAlt';
import LoremIpsum from ':storybook/components/LoremIpsum';
import Text from '../Text';
import Button from '../Button';
import Row from '.';

export default {
  title: 'Core/Row',
  parameters: {
    inspectComponents: [Row],
  },
};

export function primaryContent() {
  return (
    <Row>
      <Text>This row only has primary content in it.</Text>
    </Row>
  );
}

primaryContent.story = {
  name: 'Primary content.',
};

export function beforeContent() {
  return (
    <Row before={<img src="http://via.placeholder.com/50x50" alt="" />}>
      <Text>This row has a before component.</Text>
    </Row>
  );
}

beforeContent.story = {
  name: 'Before content.',
};

export function afterContent() {
  return (
    <Row after={<Button>Take an action</Button>}>
      <Text>This row has an after component.</Text>
    </Row>
  );
}

afterContent.story = {
  name: 'After content.',
};

export function bothBeforeAndAfterContent() {
  return (
    <Row
      middleAlign
      before={<img src="http://via.placeholder.com/50x50" alt="" />}
      after={<Button>Take an action</Button>}
    >
      <Text>This row has both before and after, and is aligned in the middle vertically.</Text>
    </Row>
  );
}

bothBeforeAndAfterContent.story = {
  name: 'Both before and after content.',
};

export function withInline() {
  return (
    <Row inline middleAlign after={<IconAddAlt decorative />}>
      <Text>Inline row with after content, middle aligned.</Text>
    </Row>
  );
}

withInline.story = {
  name: 'With inline.',
};

export function withLongContent() {
  return (
    <Row
      before={<img src="http://via.placeholder.com/50x50" alt="" />}
      after={<Button>Take an action</Button>}
    >
      <Text>
        This is some very long primary content.
        <LoremIpsum />
      </Text>
    </Row>
  );
}

withLongContent.story = {
  name: 'With long content.',
};

export function withToplineAndBaseline() {
  return (
    <Row topline baseline spacious after={<Button>Take an action</Button>}>
      <Text>A row where both topline and baseline are true.</Text>
    </Row>
  );
}

withToplineAndBaseline.story = {
  name: 'With topline and baseline.',
};

export function allLineOptions() {
  return (
    <div>
      <Row topline spacious after={<Button>Take an action</Button>}>
        <Text>A row where only topline is true.</Text>
      </Row>

      <Row topline baseline spacious after={<Button>Take an action</Button>}>
        <Text>A row with both topline and baseline.</Text>
      </Row>

      <Row baseline spacious after={<Button>Take an action</Button>}>
        <Text>A row where only baseline is true.</Text>
      </Row>
    </div>
  );
}

allLineOptions.story = {
  name: 'All line options.',
};

export function allPaddingOptions() {
  return (
    <div>
      <Row spacious topline after={<Button>Take an action</Button>}>
        <Text>A row with spacious vertical padding (24px).</Text>
      </Row>

      <Row compact baseline topline after={<Button>Take an action</Button>}>
        <Text>A row with compact vertical padding (12px).</Text>
      </Row>

      <Row baseline after={<Button>Take an action</Button>}>
        <Text>A row with no padding.</Text>
      </Row>

      <Row inline after={<Button>Take an action</Button>}>
        <Text>An inline row with no vertical padding.</Text>
      </Row>

      <Row compact inline after={<Button>Take an action</Button>}>
        <Text>
          An inline and compact row with no vertical padding and low horizontal padding (4px).
        </Text>
      </Row>
    </div>
  );
}

allPaddingOptions.story = {
  name: 'All padding options.',
};

export function withAMinHeight() {
  return (
    <Row topline baseline minHeight={200}>
      <Text>A row with a min height.</Text>
    </Row>
  );
}

withAMinHeight.story = {
  name: 'With a min height.',
};

export function withAMaxHeight() {
  return (
    <Row topline baseline maxHeight={50}>
      <Text>A row with a max height.</Text>
    </Row>
  );
}

withAMaxHeight.story = {
  name: 'With a max height.',
};
