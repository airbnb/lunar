import React from 'react';
import { storiesOf } from '@storybook/react';
import Button from './Button';
import Tooltip from './Tooltip';
import ButtonGroup from './ButtonGroup';

storiesOf('Core/ButtonGroup', module)
  .add('Group an arbitrary number of components.', () => (
    <ButtonGroup>
      <Button>One</Button>
      <Button>Two</Button>
      <Button>Three</Button>
    </ButtonGroup>
  ))
  .add('Stack buttons vertically.', () => (
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
  ))
  .add('Buttons wrapped in a `Tooltip`.', () => (
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
  ));
