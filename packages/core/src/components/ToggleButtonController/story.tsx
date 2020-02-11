import React from 'react';
import Button from '../Button';
import ButtonGroup from '../ButtonGroup';
import ToggleButtonController from '.';

export default {
  title: 'Core/ToggleButtonController',
  parameters: {
    inspectComponents: [ToggleButtonController, Button],
  },
};

export function aListOfSingleSelectToggleButtons() {
  return (
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
  );
}

aListOfSingleSelectToggleButtons.story = {
  name: 'A list of single select toggle buttons.',
};

export function handlesInvalidState() {
  return (
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
  );
}

handlesInvalidState.story = {
  name: 'Handles invalid state.',
};

export function handlesDisabledState() {
  return (
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
  );
}

handlesDisabledState.story = {
  name: 'Handles disabled state.',
};

export function asSmall() {
  return (
    <ToggleButtonController
      small
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
  );
}

asSmall.story = {
  name: 'As small.',
};

export function asLarge() {
  return (
    <ToggleButtonController
      large
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
  );
}

asLarge.story = {
  name: 'As large.',
};

export function withInline() {
  return (
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
  );
}

withInline.story = {
  name: 'With `inline`',
};
