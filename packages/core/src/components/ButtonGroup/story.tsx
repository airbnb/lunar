import React from 'react';
import Button from '../Button';
import Tooltip from '../Tooltip';
import ButtonGroup from '.';

export default {
  title: 'Core/ButtonGroup',
  parameters: {
    inspectComponents: [ButtonGroup],
  },
};

export function groupAnArbitraryNumberOfComponents() {
  return (
    <ButtonGroup>
      <Button>One</Button>
      <Button>Two</Button>
      <Button>Three</Button>
    </ButtonGroup>
  );
}

groupAnArbitraryNumberOfComponents.story = {
  name: 'Group an arbitrary number of components.',
};

export function stackButtonsVertically() {
  return (
    <div style={{ width: 300 }}>
      <ButtonGroup stacked>
        <Button block small>
          One
        </Button>
        <Button block>Two</Button>
        <Button block large>
          Three
        </Button>
      </ButtonGroup>
    </div>
  );
}

stackButtonsVertically.story = {
  name: 'Stack buttons vertically.',
};

export function buttonsWrappedInATooltip() {
  return (
    <ButtonGroup>
      <Tooltip content="One">
        <Button>One</Button>
      </Tooltip>
      <Tooltip content="Two">
        <Button>Two</Button>
      </Tooltip>
      <Tooltip content="Three">
        <Button>Three</Button>
      </Tooltip>
    </ButtonGroup>
  );
}

buttonsWrappedInATooltip.story = {
  name: 'Buttons wrapped in a `Tooltip`.',
};
