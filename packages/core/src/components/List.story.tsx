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
  .add('An ordered list.', () => (
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
  .add('Multiple items with borders.', () => (
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
