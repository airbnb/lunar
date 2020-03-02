import React, { useState } from 'react';
import Button from '@airbnb/lunar/lib/components/Button';
import LoremIpsum from ':storybook/components/LoremIpsum';
import Aside from '.';

export default {
  title: 'Layouts/Aside',
  parameters: {
    inspectComponents: [Aside],
  },
};

export function standardAsideWithAWidth() {
  return (
    <Aside width={300}>
      <LoremIpsum />
      <LoremIpsum />
      <LoremIpsum />
      <LoremIpsum />
    </Aside>
  );
}

standardAsideWithAWidth.story = {
  name: 'Standard aside with a width',
};

export function withABeforeLeftBorder() {
  return (
    <Aside before width={300}>
      <LoremIpsum />
      <LoremIpsum />
      <LoremIpsum />
      <LoremIpsum />
    </Aside>
  );
}

withABeforeLeftBorder.story = {
  name: 'With a before (left) border.',
};

export function withCollapsibleBefore() {
  return (
    <Aside before collapsible width={300}>
      <LoremIpsum />
      <LoremIpsum />
      <LoremIpsum />
      <LoremIpsum />
    </Aside>
  );
}

withCollapsibleBefore.story = {
  name: 'With a collapsible tab on the right.',
};

export function withAnAfterRightBorder() {
  return (
    <Aside after width={300}>
      <LoremIpsum />
      <LoremIpsum />
      <LoremIpsum />
      <LoremIpsum />
    </Aside>
  );
}

withAnAfterRightBorder.story = {
  name: 'With an after (right) border.',
};

export function withCollapsibleAfter() {
  return (
    <Aside after collapsible width={300}>
      <LoremIpsum />
      <LoremIpsum />
      <LoremIpsum />
      <LoremIpsum />
    </Aside>
  );
}

withCollapsibleAfter.story = {
  name: 'With a collapsible tab on the left.',
};

export function withNoPadding() {
  return (
    <Aside noPadding width={300}>
      <LoremIpsum />
      <LoremIpsum />
      <LoremIpsum />
      <LoremIpsum />
    </Aside>
  );
}

withNoPadding.story = {
  name: 'With no padding.',
};

export function asAScrollableContainer() {
  return (
    <div style={{ height: 500 }}>
      <Aside scrollable width={300}>
        <LoremIpsum />
        <LoremIpsum />
        <LoremIpsum />
        <LoremIpsum />
      </Aside>
    </div>
  );
}

asAScrollableContainer.story = {
  name: 'As a scrollable container.',
};

export function asAScrollableContainerWithCollapsibleTab() {
  return (
    <div style={{ height: 500 }}>
      <Aside before collapsible scrollable width={300}>
        <LoremIpsum />
        <LoremIpsum />
        <LoremIpsum />
        <LoremIpsum />
      </Aside>
    </div>
  );
}

asAScrollableContainerWithCollapsibleTab.story = {
  name: 'As a scrollable container with a collapsible tab.',
};

export function CanExternallyControlExpandedState() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div>
      <Button
        onClick={() => {
          setExpanded(prev => !prev);
        }}
      >
        Toggle
      </Button>

      <div style={{ height: 500 }}>
        <Aside before collapsible scrollable expanded={expanded} width={300}>
          <LoremIpsum />
          <LoremIpsum />
          <LoremIpsum />
          <LoremIpsum />
        </Aside>
      </div>
    </div>
  );
}

CanExternallyControlExpandedState.story = {
  name: 'Can externally control expanded state.',
};
