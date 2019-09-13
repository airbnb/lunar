import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import CheckBoxController from './CheckBoxController';
import BaseCheckBox from './CheckBox';

storiesOf('Core/CheckBoxController', module)
  .addParameters({
    inspectComponents: [CheckBoxController, BaseCheckBox],
  })
  .add('Controls multiple checkboxes.', () => (
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
  ))
  .add('Handles invalid state, with no spacing.', () => (
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
  ))
  .add('Handles disabled state, with no spacing.', () => (
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
  ));
