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
      <Item title="Item 1">
        <Text>
          <LoremIpsum />
        </Text>
      </Item>

      <Item title="Item 2">
        <Text>
          <LoremIpsum />
        </Text>
      </Item>

      <Item title="Item 3">
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

export function singleItemInitiallyClosed() {
  return (
    <Accordion defaultIndex={-1}>
      <Item title="Item 1">
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

export function withexpandMultiple() {
  return (
    <Accordion bordered expandMultiple>
      <Item title="Item 1">
        <Text>
          <LoremIpsum />
        </Text>
      </Item>

      <Item title="Item 2">
        <Text>
          <LoremIpsum />
        </Text>
      </Item>

      <Item title="Item 3">
        <Text>
          <LoremIpsum />
        </Text>
      </Item>
    </Accordion>
  );
}

withexpandMultiple.story = {
  name: 'Enable multiple items to be open at once.',
};

export function withNoSpacing() {
  return (
    <Accordion bordered>
      <Item noSpacing title="Item 1">
        <Text>
          <LoremIpsum />
        </Text>
      </Item>

      <Item noSpacing title="Item 2">
        <Text>
          <LoremIpsum />
        </Text>
      </Item>
    </Accordion>
  );
}

withNoSpacing.story = {
  name: 'With no horizontal spacing.',
};
