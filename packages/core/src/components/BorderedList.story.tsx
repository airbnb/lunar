import React from 'react';
import { storiesOf } from '@storybook/react';
import LoremIpsum from ':storybook/components/LoremIpsum';
import Text from './Text';
import BorderedList, { Item } from './BorderedList';

storiesOf('Core/BorderedList', module)
  .addParameters({
    inspectComponents: [BorderedList, Item],
  })
  .add('Multiple items with borders.', () => (
    <BorderedList>
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
    </BorderedList>
  ))
  .add('Items with `compact` padding.', () => (
    <BorderedList>
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
    </BorderedList>
  ))
  .add('Items with `spacious` padding.', () => (
    <BorderedList>
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
    </BorderedList>
  ));
