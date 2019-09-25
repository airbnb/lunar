import React from 'react';
import { storiesOf } from '@storybook/react';
import LoremIpsum from ':storybook/components/LoremIpsum';
import Text from './Text';
import List, { Item } from './List';

storiesOf('Core/List', module)
  .addParameters({
    inspectComponents: [List, Item],
  })
  .add('Default unordered list.', () => (
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
  ))
  .add('List with `gutter`.', () => (
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
  ))
  .add('List with `horizontal`.', () => (
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
  ))
  .add('List  with `horizontal` and `gutter`.', () => (
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
  ))
  .add('List with `horizontal` and `wrap`.', () => (
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
  ))
  .add('List with `ordered` to render as `<ol></ol>`.', () => (
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
  ))
  .add('Items with `bordered`.', () => (
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
  ))
  .add('Items with `compact` padding.', () => (
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
  ))
  .add('Items with `spacious` padding.', () => (
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
  ));
