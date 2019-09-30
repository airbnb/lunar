import React from 'react';
import LoremIpsum from ':storybook/components/LoremIpsum';
import Text from '../Text';
import Accordion, { Item } from '.';

export default {
  title: 'Core/Accordion',
  parameters: {
    inspectComponents: [Accordion, Item],
  },
};

export function multipleItemsWithBorders() {
  return (
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
  );
}

multipleItemsWithBorders.story = {
  name: 'Multiple items with borders.',
};

export function singleItemInitiallyClosed() {
  return (
    <Accordion defaultIndex={-1}>
      <Item title="Item 1" id="one">
        <Text>
          <LoremIpsum />
        </Text>
      </Item>
    </Accordion>
  );
}

singleItemInitiallyClosed.story = {
  name: 'Single item initially closed.',
};

export function customTitleComponent() {
  return (
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
  );
}

customTitleComponent.story = {
  name: 'Custom title component.',
};

export function withNoSpacing() {
  return (
    <Accordion bordered>
      <Item noSpacing title="Item 1" id="one">
        <Text>
          <LoremIpsum />
        </Text>
      </Item>

      <Item noSpacing title="Item 2" id="two">
        <Text>
          <LoremIpsum />
        </Text>
      </Item>
    </Accordion>
  );
}

withNoSpacing.story = {
  name: 'With no spacing.',
};
