import React from 'react';
import { storiesOf } from '@storybook/react';
import LoremIpsum from ':storybook/components/LoremIpsum';
import IconAddAlt from '@airbnb/lunar-icons/lib/interface/IconAddAlt';
import Text from './Text';
import Button from './Button';
import Row from './Row';

storiesOf('Core/Row', module)
  .addParameters({
    inspectComponents: [Row],
  })
  .add('Primary content.', () => (
    <Row>
      <Text>This row only has primary content in it.</Text>
    </Row>
  ))
  .add('Before content.', () => (
    <Row before={<img src="http://via.placeholder.com/50x50" alt="" />}>
      <Text>This row has a before component.</Text>
    </Row>
  ))
  .add('After content.', () => (
    <Row after={<Button>Take an action</Button>}>
      <Text>This row has an after component.</Text>
    </Row>
  ))
  .add('Both before and after content.', () => (
    <Row
      middleAlign
      before={<img src="http://via.placeholder.com/50x50" alt="" />}
      after={<Button>Take an action</Button>}
    >
      <Text>This row has both before and after, and is aligned in the middle vertically.</Text>
    </Row>
  ))
  .add('With inline.', () => (
    <Row
      inline
      middleAlign
      before={<img src="http://via.placeholder.com/50x50" alt="" />}
      after={<IconAddAlt decorative />}
    >
      <Text>Inline row with after content, middle aligned.</Text>
    </Row>
  ))
  .add('With long content.', () => (
    <Row
      before={<img src="http://via.placeholder.com/50x50" alt="" />}
      after={<Button>Take an action</Button>}
    >
      <Text>
        This is some very long primary content.
        <LoremIpsum />
      </Text>
    </Row>
  ))
  .add('With topline and baseline.', () => (
    <Row after={<Button>Take an action</Button>} topline baseline spacious>
      <Text>A row where both topline and baseline are true.</Text>
    </Row>
  ))
  .add('All line options.', () => (
    <>
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
    </>
  ))
  .add('All padding options.', () => (
    <>
      <div>
        <Row topline spacious after={<Button>Take an action</Button>}>
          <Text>A row with spacious padding.</Text>
        </Row>

        <Row topline baseline compact after={<Button>Take an action</Button>}>
          <Text>A row with compact padding.</Text>
        </Row>

        <Row baseline after={<Button>Take an action</Button>}>
          <Text>A row with no padding.</Text>
        </Row>
      </div>
    </>
  ));
