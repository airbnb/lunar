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
      label="Favorite colors?"
      name="color"
      value={['green']}
      onChange={action('onChange')}
      optional
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
      label="Favorite colors?"
      name="color"
      value={['green']}
      onChange={action('onChange')}
      invalid
    >
      {CheckBox => (
        <div>
          <CheckBox label="❤️ Red" value="red" noSpacing />
          <CheckBox label="💙 Blue" value="blue" noSpacing />
          <CheckBox label="💚 Green" value="green" noSpacing />
        </div>
      )}
    </CheckBoxController>
  ))
  .add('Handles disabled state, with no spacing.', () => (
    <CheckBoxController
      label="Favorite colors?"
      name="color"
      value={['green']}
      onChange={action('onChange')}
      disabled
    >
      {CheckBox => (
        <div>
          <CheckBox label="❤️ Red" value="red" noSpacing />
          <CheckBox label="💙 Blue" value="blue" noSpacing />
          <CheckBox label="💚 Green" value="green" noSpacing />
        </div>
      )}
    </CheckBoxController>
  ));
