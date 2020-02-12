import React from 'react';
import CheckBoxController from '.';
import BaseCheckBox from '../CheckBox';

export default {
  title: 'Core/CheckBoxController',
  parameters: {
    inspectComponents: [CheckBoxController, BaseCheckBox],
  },
};

export function controlsMultipleCheckboxes() {
  return (
    <CheckBoxController
      optional
      label="Favorite colors?"
      name="color"
      value={['green']}
      onChange={action('onChange')}
    >
      {CheckBox => (
        <div>
          <CheckBox label="❤️ Red" value="red" />
          <CheckBox label="💙 Blue" value="blue" />
          <CheckBox label="💚 Green" value="green" />
        </div>
      )}
    </CheckBoxController>
  );
}

controlsMultipleCheckboxes.story = {
  name: 'Controls multiple checkboxes.',
};

export function handlesInvalidStateWithNoSpacing() {
  return (
    <CheckBoxController
      invalid
      label="Favorite colors?"
      name="color"
      value={['green']}
      onChange={action('onChange')}
    >
      {CheckBox => (
        <div>
          <CheckBox noSpacing label="❤️ Red" value="red" />
          <CheckBox noSpacing label="💙 Blue" value="blue" />
          <CheckBox noSpacing label="💚 Green" value="green" />
        </div>
      )}
    </CheckBoxController>
  );
}

handlesInvalidStateWithNoSpacing.story = {
  name: 'Handles invalid state, with no spacing.',
};

export function handlesDisabledStateWithNoSpacing() {
  return (
    <CheckBoxController
      disabled
      label="Favorite colors?"
      name="color"
      value={['green']}
      onChange={action('onChange')}
    >
      {CheckBox => (
        <div>
          <CheckBox noSpacing label="❤️ Red" value="red" />
          <CheckBox noSpacing label="💙 Blue" value="blue" />
          <CheckBox noSpacing label="💚 Green" value="green" />
        </div>
      )}
    </CheckBoxController>
  );
}

handlesDisabledStateWithNoSpacing.story = {
  name: 'Handles disabled state, with no spacing.',
};

export function asSmall() {
  return (
    <CheckBoxController
      optional
      small
      label="Favorite colors?"
      name="color"
      value={['green']}
      onChange={action('onChange')}
    >
      {CheckBox => (
        <div>
          <CheckBox label="❤️ Red" value="red" />
          <CheckBox label="💙 Blue" value="blue" />
          <CheckBox label="💚 Green" value="green" />
        </div>
      )}
    </CheckBoxController>
  );
}

asSmall.story = {
  name: 'As small.',
};

export function asLarge() {
  return (
    <CheckBoxController
      optional
      large
      label="Favorite colors?"
      name="color"
      value={['green']}
      onChange={action('onChange')}
    >
      {CheckBox => (
        <div>
          <CheckBox label="❤️ Red" value="red" />
          <CheckBox label="💙 Blue" value="blue" />
          <CheckBox label="💚 Green" value="green" />
        </div>
      )}
    </CheckBoxController>
  );
}

asLarge.story = {
  name: 'As large.',
};
