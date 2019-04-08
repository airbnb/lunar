import React from 'react';
import { storiesOf } from '@storybook/react';
import LoremIpsum from ':storybook/components/LoremIpsum';
import Text from './Text';
import Tabs, { Tab } from './Tabs';

storiesOf('Core/Tabs', module)
  .add('Standard tabs with no body content.', () => (
    <Tabs>
      <Tab key="a" label={<Text bold>Bruce W.</Text>} />
      <Tab key="b" label={<Text bold>Clark K.</Text>} />
      <Tab key="c" label={<Text bold>Peter P.</Text>} />
    </Tabs>
  ))
  .add('Standard tabs stretched with no body content.', () => (
    <Tabs stretched>
      <Tab key="a" label={<Text bold>Bruce W.</Text>} />
      <Tab key="b" label={<Text bold>Clark K.</Text>} />
      <Tab key="c" label={<Text bold>Peter P.</Text>} />
    </Tabs>
  ))
  .add('Borderless tabs with no body content.', () => (
    <Tabs borderless>
      <Tab key="a" label={<Text bold>Bruce W.</Text>} />
      <Tab key="b" label={<Text bold>Clark K.</Text>} />
      <Tab key="c" disabled label={<Text bold>Peter P.</Text>} />
    </Tabs>
  ))
  .add('Render anchor links when passing .', () => (
    <Tabs>
      <Tab key="a" href="#mj" label={<Text bold>Bruce W.</Text>} />
      <Tab key="b" href="#cp" label={<Text bold>Clark K.</Text>} />
      <Tab key="c" href="#th" label={<Text bold>Peter P.</Text>} />
    </Tabs>
  ))
  .add('With body content and a default selected index.', () => (
    <Tabs defaultKey="c">
      <Tab key="a" label={<Text bold>Bruce W.</Text>}>
        <Text>
          <LoremIpsum />
        </Text>
      </Tab>

      <Tab key="b" label={<Text bold>Clark K.</Text>} disabled>
        <Text>
          <LoremIpsum />
        </Text>
      </Tab>

      <Tab key="c" label={<Text bold>Peter P.</Text>}>
        <Text>
          <LoremIpsum />
        </Text>
      </Tab>
    </Tabs>
  ))
  .add('With scrollable variable height tabs.', () => (
    <div style={{ width: '325px' }}>
      <Tabs scrollable>
        <Tab
          key="a"
          label={
            <Text bold>
              Bruce
              <br />
              Wayne
            </Text>
          }
        />
        <Tab key="b" label={<Text bold>Clark K.</Text>} />
        <Tab
          key="c"
          label={
            <Text bold>
              Peter
              <br />
              Parker
            </Text>
          }
        />
        <Tab key="d" label={<Text bold>Tony S.</Text>} />
        <Tab key="e" label={<Text bold>Bruce B.</Text>} />
      </Tabs>
    </div>
  ));
