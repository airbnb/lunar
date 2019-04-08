import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import ButtonGroup from './ButtonGroup';
import ToggleButtonController from './ToggleButtonController';

storiesOf('Core/ToggleButtonController', module)
  .add('A list of single select toggle buttons.', () => (
    <ToggleButtonController
      value="red"
      name="button-group-controller"
      label="Favorite color?"
      onChange={action('onChange')}
    >
      {ControlledButton => (
        <ButtonGroup>
          <ControlledButton value="red" key="red">
            Red
          </ControlledButton>
          <ControlledButton value="blue" key="blue">
            Blue
          </ControlledButton>
          <ControlledButton value="green" key="green">
            Green
          </ControlledButton>
        </ButtonGroup>
      )}
    </ToggleButtonController>
  ))
  .add('Handles invalid state.', () => (
    <ToggleButtonController
      value="red"
      name="button-group-controller"
      label="Favorite color?"
      onChange={action('onChange')}
      invalid
    >
      {ControlledButton => (
        <ButtonGroup>
          <ControlledButton value="red" key="red">
            Red
          </ControlledButton>
          <ControlledButton value="blue" key="blue">
            Blue
          </ControlledButton>
          <ControlledButton value="green" key="green">
            Green
          </ControlledButton>
        </ButtonGroup>
      )}
    </ToggleButtonController>
  ))
  .add('Handles disabled state.', () => (
    <ToggleButtonController
      value="red"
      name="button-group-controller"
      label="Favorite color?"
      onChange={action('onChange')}
      disabled
    >
      {ControlledButton => (
        <ButtonGroup>
          <ControlledButton value="red" key="red">
            Red
          </ControlledButton>
          <ControlledButton value="blue" key="blue">
            Blue
          </ControlledButton>
          <ControlledButton value="green" key="green">
            Green
          </ControlledButton>
        </ButtonGroup>
      )}
    </ToggleButtonController>
  ));
