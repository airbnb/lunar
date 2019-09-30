import React from 'react';
import { action } from '@storybook/addon-actions';
import RadioButtonController from '.';
import BaseRadioButton from '../RadioButton';

export default {
  title: 'Core/RadioButtonController',
  parameters: {
    inspectComponents: [RadioButtonController, BaseRadioButton],
  },
};

export function controlsMultipleRadioButtons() {
  return (
    <RadioButtonController
      optional
      label="Favorite food?"
      name="food"
      onChange={action('onChange')}
    >
      {RadioButton => (
        <div>
          <RadioButton label="🍕 Pizza" value="pizza" />
          <RadioButton label="🍔 Burger" value="burger" />
          <RadioButton label="🍜 Ramen" value="ramen" />
        </div>
      )}
    </RadioButtonController>
  );
}

controlsMultipleRadioButtons.story = {
  name: 'Controls multiple radio buttons.',
};

export function handlesInvalidStateWithNoSpacing() {
  return (
    <RadioButtonController invalid label="Favorite food?" name="food" onChange={action('onChange')}>
      {RadioButton => (
        <div>
          <RadioButton noSpacing label="🍕 Pizza" value="pizza" />
          <RadioButton noSpacing label="🍔 Burger" value="burger" />
          <RadioButton noSpacing label="🍜 Ramen" value="ramen" />
        </div>
      )}
    </RadioButtonController>
  );
}

handlesInvalidStateWithNoSpacing.story = {
  name: 'Handles invalid state, with no spacing.',
};

export function handlesDisabledStateWithNoSpacing() {
  return (
    <RadioButtonController
      disabled
      label="Favorite food?"
      name="food"
      onChange={action('onChange')}
    >
      {RadioButton => (
        <div>
          <RadioButton noSpacing label="🍕 Pizza" value="pizza" />
          <RadioButton noSpacing label="🍔 Burger" value="burger" />
          <RadioButton noSpacing label="🍜 Ramen" value="ramen" />
        </div>
      )}
    </RadioButtonController>
  );
}

handlesDisabledStateWithNoSpacing.story = {
  name: 'Handles disabled state, with no spacing.',
};
