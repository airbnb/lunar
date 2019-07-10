import React from 'react';
import { storiesOf } from '@storybook/react';
import LoremIpsum from ':storybook/components/LoremIpsum';
import Text from './Text';
import Accordion, { Item } from './Accordion';

storiesOf('Core/Accordion', module)
  .addParameters({
    inspectComponents: [Accordion, Item],
  })
  .add('Multiple items with borders.', () => (
    <Accordion bordered>
      <Item title="Item 1" id="one">
        <Text>
          <LoremIpsum />
        </Text>
      </Item>

      <Item title="Item 2" id="two">
        <Text>
          <LoremIpsum />
        </Text>
      </Item>

      <Item title="Item 3" id="three">
        <Text>
          <LoremIpsum />
        </Text>
      </Item>
    </Accordion>
  ))
  .add('Single item initially closed.', () => (
    <Accordion defaultIndex={-1}>
      <Item title="Item 1" id="one">
        <Text>
          <LoremIpsum />
        </Text>
      </Item>
    </Accordion>
  ))
  .add('Custom title component.', () => (
    <Accordion bordered>
      <Item
        title={
          <header>
            <div>Main Title</div>
            <small>Subtitle</small>
          </header>
        }
        id="one"
      >
        <Text>
          <LoremIpsum />
        </Text>
      </Item>
    </Accordion>
  ));
