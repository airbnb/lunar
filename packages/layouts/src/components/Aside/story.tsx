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
          setExpanded((prev) => !prev);
        }}
      >
        Toggle
      </Button>

      <div style={{ height: 500 }}>
        <Aside
          before
          collapsible
          scrollable
          expanded={expanded}
          width={300}
          onCollapseToggle={(ex) => {
            if (ex !== expanded) {
              setExpanded(ex);
            }
          }}
        >
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

export function CanControlMultipleAsides() {
  const [expanded, setExpanded] = useState('left');

  return (
    <div>
      <div>
        <Button
          onClick={() => {
            setExpanded('left');
          }}
        >
          Expand left
        </Button>{' '}
        <Button
          onClick={() => {
            setExpanded('right');
          }}
        >
          Expand right
        </Button>
      </div>

      <div style={{ height: 500, display: 'flex' }}>
        <div>
          <Aside
            before
            collapsible
            scrollable
            width={300}
            expanded={expanded === 'left'}
            onCollapseToggle={(exp) => {
              if (exp) {
                setExpanded('left');
              } else {
                setExpanded('right');
              }
            }}
          >
            <LoremIpsum />
            <LoremIpsum />
            <LoremIpsum />
            <LoremIpsum />
          </Aside>
        </div>

        <div style={{ width: 100 }}> </div>

        <div>
          <Aside
            after
            collapsible
            scrollable
            width={300}
            expanded={expanded === 'right'}
            onCollapseToggle={(exp) => {
              if (exp) {
                setExpanded('right');
              } else {
                setExpanded('left');
              }
            }}
          >
            <LoremIpsum />
            <LoremIpsum />
            <LoremIpsum />
            <LoremIpsum />
          </Aside>
        </div>
      </div>
    </div>
  );
}

CanControlMultipleAsides.story = {
  name: 'Can externally control multiple asides.',
};
