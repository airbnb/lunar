import React from 'react';
import LoremIpsum from ':storybook/components/LoremIpsum';
import Text from '../Text';
import Timeline from '.';
import Item from './Item';
import Button from '../Button';
import StatusLabel from '../StatusLabel';

const fixedDate = new Date(2019, 1, 1, 0, 0, 0);

const future = new Date();
future.setDate(fixedDate.getDate() + 12);

const lastMonth = new Date();
lastMonth.setMonth(fixedDate.getMonth() - 1);

const lastYear = new Date();
lastYear.setFullYear(fixedDate.getFullYear() - 1);

export default {
  title: 'Core/Timeline',
  parameters: {
    inspectComponents: [Timeline, Item],
  },
};

export function basicFunctionality() {
  return (
    <Timeline>
      <Item at={future}>
        <Text>
          <LoremIpsum />
        </Text>
        <StatusLabel warning>Warning label</StatusLabel>
      </Item>

      <Item secondary>
        <Text small muted>
          Secondary timeline items do not show their{' '}
          <Text inline small bold>
            Timestamps
          </Text>
        </Text>
      </Item>

      <Item at={fixedDate}>
        <Button>Does nothing</Button>
      </Item>

      <Item at={lastMonth}>
        <Text>
          <LoremIpsum />
        </Text>
      </Item>

      <Item oldest at={lastYear}>
        <Text>This is the oldest item, so it does not have a line next to it, neat.</Text>
      </Item>
    </Timeline>
  );
}

basicFunctionality.story = {
  name: 'Basic functionality',
};
