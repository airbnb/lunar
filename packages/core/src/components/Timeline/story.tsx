import React from 'react';
import LoremIpsum from ':storybook/components/LoremIpsum';
import Text from '../Text';
import Timeline from '.';
import Item from './Item';
import SimpleItem from './SimpleItem';
import Button from '../Button';
import StatusLabel from '../StatusLabel';

export default {
  title: 'Core/Timeline',
  parameters: {
    inspectComponents: [Timeline, Item, SimpleItem],
  },
};

export function basicFunctionality() {
  const now = new Date();

  const nextMonth = new Date();
  nextMonth.setMonth(now.getMonth() + 1);

  const lastMonth = new Date();
  lastMonth.setMonth(now.getMonth() - 1);

  const lastYear = new Date();
  lastYear.setFullYear(now.getFullYear() - 1);

  return (
    <Timeline>
      <Item at={nextMonth}>
        <Text>
          <LoremIpsum />
        </Text>
        <StatusLabel warning>Warning label</StatusLabel>
      </Item>

      <SimpleItem>
        <Text small muted>
          Simple timeline items don't show their{' '}
          <Text inline small bold>
            Timestamps
          </Text>
        </Text>
      </SimpleItem>

      <Item at={now}>
        <Button>Does nothing</Button>
      </Item>

      <Item at={lastMonth}>
        <Text>
          <LoremIpsum />
        </Text>
      </Item>

      <Item oldest at={lastYear}>
        <Text>This is the oldest item, so it doesn't have a "line" next to it, neat.</Text>
      </Item>
    </Timeline>
  );
}

basicFunctionality.story = {
  name: 'Basic functionality',
};
