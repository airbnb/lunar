import React from 'react';
import { storiesOf } from '@storybook/react';
import IconAdd from '@airbnb/lunar-icons/lib/interface/IconAddAlt';
import IconRemove from '@airbnb/lunar-icons/lib/interface/IconRemoveAlt';
import LoremIpsum from ':storybook/components/LoremIpsum';
import Text from './Text';
import Tabs, { Tab } from './Tabs';

storiesOf('Core/Tabs', module)
  .addParameters({
    inspectComponents: [Tabs, Tab],
  })
  .add('Standard tabs with no body content.', () => (
    <Tabs>
      <Tab key="a" label="Bruce W." />
      <Tab key="b" label="Clark K." />
      <Tab key="c" label="Peter P." />
    </Tabs>
  ))
  .add('Small tabs stretched.', () => (
    <Tabs stretched>
      <Tab key="a" label="Bruce W." small />
      <Tab key="b" label="Clark K." small />
      <Tab key="c" label="Peter P." small />
    </Tabs>
  ))
  .add('Borderless tabs with icons.', () => (
    <Tabs borderless>
      <Tab key="a" label="Bruce W." beforeIcon={<IconAdd decorative size="1.25em" />} />
      <Tab key="b" label="Clark K." />
      <Tab key="c" disabled label="Peter P." afterIcon={<IconRemove decorative size="1.25em" />} />
    </Tabs>
  ))
  .add('Render anchor links when passing .', () => (
    <Tabs>
      <Tab key="a" href="#mj" label="Bruce W." />
      <Tab key="b" href="#cp" label="Clark K." />
      <Tab key="c" href="#th" label="Peter P." />
    </Tabs>
  ))
  .add('With body content and a default selected index.', () => (
    <Tabs defaultKey="c">
      <Tab key="a" label="Bruce W.">
        <Text>
          <LoremIpsum />
        </Text>
      </Tab>

      <Tab key="b" label="Clark K." disabled>
        <Text>
          <LoremIpsum />
        </Text>
      </Tab>

      <Tab key="c" label="Peter P.">
        <Text>
          <LoremIpsum />
        </Text>
      </Tab>
    </Tabs>
  ))
  .add('Persist with hash and back button.', () => (
    <Tabs persistWithHash="tab">
      <Tab key="a" label="Bruce W.">
        <Text>
          <LoremIpsum />
        </Text>
      </Tab>

      <Tab key="b" label="Clark K.">
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
            <>
              Bruce
              <br />
              Wayne
            </>
          }
        />
        <Tab key="b" label="Clark K." />
        <Tab
          key="c"
          label={
            <>
              Peter
              <br />
              Parker
            </>
          }
        />
        <Tab key="d" label="Tony S." />
        <Tab key="e" label="Bruce B." />
      </Tabs>
    </div>
  ));
