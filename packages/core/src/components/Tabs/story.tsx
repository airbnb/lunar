import React from 'react';
import IconAdd from '@airbnb/lunar-icons/lib/interface/IconAddAlt';
import IconRemove from '@airbnb/lunar-icons/lib/interface/IconRemoveAlt';
import LoremIpsum from ':storybook/components/LoremIpsum';
import Text from '../Text';
import Tabs, { Tab } from '.';

export default {
  title: 'Core/Tabs',
  parameters: {
    inspectComponents: [Tabs, Tab],
  },
};

export function standardTabsWithNoBodyContent() {
  return (
    <Tabs>
      <Tab key="a" label="Bruce W." />
      <Tab key="b" label="Clark K." />
      <Tab key="c" label="Peter P." />
    </Tabs>
  );
}

standardTabsWithNoBodyContent.story = {
  name: 'Standard tabs with no body content.',
};

export function smallTabsStretched() {
  return (
    <Tabs stretched>
      <Tab key="a" small label="Bruce W." />
      <Tab key="b" small label="Clark K." />
      <Tab key="c" small label="Peter P." />
    </Tabs>
  );
}

smallTabsStretched.story = {
  name: 'Small tabs stretched.',
};

export function borderlessTabsWithIcons() {
  return (
    <Tabs borderless>
      <Tab key="a" label="Bruce W." beforeIcon={<IconAdd decorative size="1.25em" />} />
      <Tab key="b" label="Clark K." />
      <Tab key="c" disabled label="Peter P." afterIcon={<IconRemove decorative size="1.25em" />} />
    </Tabs>
  );
}

borderlessTabsWithIcons.story = {
  name: 'Borderless tabs with icons.',
};

export function renderAnchorLinksWhenPassing() {
  return (
    <Tabs>
      <Tab key="a" href="#mj" label="Bruce W." />
      <Tab key="b" href="#cp" label="Clark K." />
      <Tab key="c" href="#th" label="Peter P." />
    </Tabs>
  );
}

renderAnchorLinksWhenPassing.story = {
  name: 'Render anchor links when passing .',
};

export function withBodyContentAndADefaultSelectedIndex() {
  return (
    <Tabs defaultKey="c">
      <Tab key="a" label="Bruce W.">
        <Text>
          <LoremIpsum />
        </Text>
      </Tab>

      <Tab key="b" disabled label="Clark K.">
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
  );
}

withBodyContentAndADefaultSelectedIndex.story = {
  name: 'With body content and a default selected index.',
};

export function persistWithHashAndBackButton() {
  return (
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
  );
}

persistWithHashAndBackButton.story = {
  name: 'Persist with hash and back button.',
};

export function withScrollableVariableHeightTabs() {
  return (
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
  );
}

withScrollableVariableHeightTabs.story = {
  name: 'With scrollable variable height tabs.',
};
