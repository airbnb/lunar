import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Button from './Button';
import ButtonGroup from './ButtonGroup';
import ToggleButtonController from './ToggleButtonController';

storiesOf('Core/ToggleButtonController', module)
  .addParameters({
    inspectComponents: [ToggleButtonController, Button],
  })
  .add('A list of single select toggle buttons.', () => (
    <ToggleButtonController
      value="red"
      name="button-group-controller"
      label="Favorite color?"
      onChange={action('onChange')}
    >
      {ControlledButton => (
        <ButtonGroup>
          <ControlledButton key="red" value="red">
            Red
          </ControlledButton>
          <ControlledButton key="blue" value="blue">
            Blue
          </ControlledButton>
          <ControlledButton key="green" value="green">
            Green
          </ControlledButton>
        </ButtonGroup>
      )}
    </ToggleButtonController>
  ))
  .add('Handles invalid state.', () => (
    <ToggleButtonController
      invalid
      value="red"
      name="button-group-controller"
      label="Favorite color?"
      onChange={action('onChange')}
    >
      {ControlledButton => (
        <ButtonGroup>
          <ControlledButton key="red" value="red">
            Red
          </ControlledButton>
          <ControlledButton key="blue" value="blue">
            Blue
          </ControlledButton>
          <ControlledButton key="green" value="green">
            Green
          </ControlledButton>
        </ButtonGroup>
      )}
    </ToggleButtonController>
  ))
  .add('Handles disabled state.', () => (
    <ToggleButtonController
      disabled
      value="red"
      name="button-group-controller"
      label="Favorite color?"
      onChange={action('onChange')}
    >
      {ControlledButton => (
        <ButtonGroup>
          <ControlledButton key="red" value="red">
            Red
          </ControlledButton>
          <ControlledButton key="blue" value="blue">
            Blue
          </ControlledButton>
          <ControlledButton key="green" value="green">
            Green
          </ControlledButton>
        </ButtonGroup>
      )}
    </ToggleButtonController>
  ))
  .add('With `compact`', () => (
    <ToggleButtonController
      compact
      value="red"
      name="button-group-controller"
      label="Favorite color?"
      onChange={action('onChange')}
    >
      {ControlledButton => (
        <ButtonGroup>
          <ControlledButton key="red" value="red">
            Red
          </ControlledButton>
          <ControlledButton key="blue" value="blue">
            Blue
          </ControlledButton>
          <ControlledButton key="green" value="green">
            Green
          </ControlledButton>
        </ButtonGroup>
      )}
    </ToggleButtonController>
  ))
  .add('With `inline`', () => (
    <ToggleButtonController
      inline
      value="red"
      name="button-group-controller"
      label="Favorite color?"
      onChange={action('onChange')}
    >
      {ControlledButton => (
        <ButtonGroup>
          <ControlledButton key="red" value="red">
            Red
          </ControlledButton>
          <ControlledButton key="blue" value="blue">
            Blue
          </ControlledButton>
          <ControlledButton key="green" value="green">
            Green
          </ControlledButton>
        </ButtonGroup>
      )}
    </ToggleButtonController>
  ));
