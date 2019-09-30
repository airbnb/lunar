import React from 'react';
import LoremIpsum from ':storybook/components/LoremIpsum';
import Text from '../Text';
import List, { Item } from '.';

export default {
  title: 'Core/List',
  parameters: {
    inspectComponents: [List, Item],
  },
};

export function defaultUnorderedList() {
  return (
    <List>
      <Item>
        <Text>
          <LoremIpsum short />
        </Text>
      </Item>

      <Item>
        <Text>
          <LoremIpsum short />
        </Text>
      </Item>

      <Item>
        <Text>
          <LoremIpsum short />
        </Text>
      </Item>
    </List>
  );
}

defaultUnorderedList.story = {
  name: 'Default unordered list.',
};

export function listWithGutter() {
  return (
    <List gutter>
      <Item>
        <Text>
          <LoremIpsum short />
        </Text>
      </Item>

      <Item>
        <Text>
          <LoremIpsum short />
        </Text>
      </Item>

      <Item>
        <Text>
          <LoremIpsum short />
        </Text>
      </Item>
    </List>
  );
}

listWithGutter.story = {
  name: 'List with `gutter`.',
};

export function listWithHorizontal() {
  return (
    <List horizontal>
      <Item>
        <Text>
          <LoremIpsum short />
        </Text>
      </Item>

      <Item>
        <Text>
          <LoremIpsum short />
        </Text>
      </Item>

      <Item>
        <Text>
          <LoremIpsum short />
        </Text>
      </Item>
    </List>
  );
}

listWithHorizontal.story = {
  name: 'List with `horizontal`.',
};

export function listWithHorizontalAndGutter() {
  return (
    <List gutter horizontal>
      <Item>
        <Text>
          <LoremIpsum short />
        </Text>
      </Item>

      <Item>
        <Text>
          <LoremIpsum short />
        </Text>
      </Item>

      <Item>
        <Text>
          <LoremIpsum short />
        </Text>
      </Item>
    </List>
  );
}

listWithHorizontalAndGutter.story = {
  name: 'List  with `horizontal` and `gutter`.',
};

export function listWithHorizontalAndWrap() {
  return (
    <List horizontal wrap>
      <Item>
        <Text>
          <LoremIpsum short />
        </Text>
      </Item>

      <Item>
        <Text>
          <LoremIpsum short />
        </Text>
      </Item>

      <Item>
        <Text>
          <LoremIpsum short />
        </Text>
      </Item>
    </List>
  );
}

listWithHorizontalAndWrap.story = {
  name: 'List with `horizontal` and `wrap`.',
};

export function listWithOrderedToRenderAsOlOl() {
  return (
    <List ordered>
      <Item>
        <Text>
          <LoremIpsum short />
        </Text>
      </Item>

      <Item>
        <Text>
          <LoremIpsum short />
        </Text>
      </Item>

      <Item>
        <Text>
          <LoremIpsum short />
        </Text>
      </Item>
    </List>
  );
}

listWithOrderedToRenderAsOlOl.story = {
  name: 'List with `ordered` to render as `<ol></ol>`.',
};

export function itemsWithBordered() {
  return (
    <List>
      <Item bordered>
        <Text>
          <LoremIpsum short />
        </Text>
      </Item>

      <Item bordered>
        <Text>
          <LoremIpsum short />
        </Text>
      </Item>

      <Item bordered>
        <Text>
          <LoremIpsum short />
        </Text>
      </Item>
    </List>
  );
}

itemsWithBordered.story = {
  name: 'Items with `bordered`.',
};

export function itemsWithCompactPadding() {
  return (
    <List>
      <Item compact>
        <Text>
          <LoremIpsum short />
        </Text>
      </Item>

      <Item compact>
        <Text>
          <LoremIpsum short />
        </Text>
      </Item>

      <Item compact>
        <Text>
          <LoremIpsum short />
        </Text>
      </Item>
    </List>
  );
}

itemsWithCompactPadding.story = {
  name: 'Items with `compact` padding.',
};

export function itemsWithSpaciousPadding() {
  return (
    <List>
      <Item spacious>
        <Text>
          <LoremIpsum short />
        </Text>
      </Item>

      <Item spacious>
        <Text>
          <LoremIpsum short />
        </Text>
      </Item>

      <Item spacious>
        <Text>
          <LoremIpsum short />
        </Text>
      </Item>
    </List>
  );
}

itemsWithSpaciousPadding.story = {
  name: 'Items with `spacious` padding.',
};
