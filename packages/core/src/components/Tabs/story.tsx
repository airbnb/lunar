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

export function secondaryTabs() {
  return (
    <Tabs secondary>
      <Tab key="a" label="Lorem is an example">
        <Text>
          <LoremIpsum short />
        </Text>
      </Tab>
      <Tab key="b" label="Ipsum">
        <Text>
          <LoremIpsum medium />
        </Text>
      </Tab>
      <Tab key="c" disabled label="Dolor" />
      <Tab key="d" label="another" beforeIcon={<IconAdd decorative size="1.25em" />} />
      <Tab key="e" label="amazing item" />
      <Tab key="f" label="to be clicked " />
      <Tab key="g" label="and selected" />
    </Tabs>
  );
}

secondaryTabs.story = {
  name: 'Secondary tabs.',
};

export function secondarySmallTabs() {
  return (
    <Tabs secondary>
      <Tab key="a" small label="Lorem" beforeIcon={<IconAdd decorative />}>
        <Text>
          <LoremIpsum short />
        </Text>
      </Tab>
      <Tab key="b" small label="Ipsum">
        <Text>
          <LoremIpsum medium />
        </Text>
      </Tab>
      <Tab key="c" disabled small label="Dolor" />
    </Tabs>
  );
}

secondarySmallTabs.story = {
  name: 'Secondary small tabs.',
};

export function secondaryTabsStretched() {
  return (
    <Tabs secondary stretched>
      <Tab key="a" label="Lorem">
        <Text>
          <LoremIpsum short />
        </Text>
      </Tab>
      <Tab key="b" label="Ipsum">
        <Text>
          <LoremIpsum medium />
        </Text>
      </Tab>
      <Tab key="c" disabled label="Dolor" />
    </Tabs>
  );
}

secondaryTabsStretched.story = {
  name: 'Secondary stretched tabs.',
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

const onPushState = (...args: Array<unknown>) => action('onPushState')(args);

export function persistWithHashAndonPushState() {
  return (
    <Tabs persistWithHash="tab" onPushState={onPushState}>
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

persistWithHashAndonPushState.story = {
  name: 'Custom pushState function.',
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

export function withScrollableVariableHeightSecondaryTabs() {
  return (
    <div style={{ width: '325px' }}>
      <Tabs scrollable secondary>
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

withScrollableVariableHeightSecondaryTabs.story = {
  name: 'With scrollable variable height secondary tabs.',
};
