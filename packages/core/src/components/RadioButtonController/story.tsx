import React from 'react';
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
      onChange={() => console.log('onChange')}
    >
      {(RadioButton) => (
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

export function asSmall() {
  return (
    <RadioButtonController
      optional
      small
      label="Favorite food?"
      name="food"
      onChange={() => console.log('onChange')}
    >
      {(RadioButton) => (
        <div>
          <RadioButton label="🍕 Pizza" value="pizza" />
          <RadioButton label="🍔 Burger" value="burger" />
          <RadioButton label="🍜 Ramen" value="ramen" />
        </div>
      )}
    </RadioButtonController>
  );
}

asSmall.story = {
  name: 'As small.',
};

export function asLarge() {
  return (
    <RadioButtonController
      optional
      large
      label="Favorite food?"
      name="food"
      onChange={() => console.log('onChange')}
    >
      {(RadioButton) => (
        <div>
          <RadioButton label="🍕 Pizza" value="pizza" />
          <RadioButton label="🍔 Burger" value="burger" />
          <RadioButton label="🍜 Ramen" value="ramen" />
        </div>
      )}
    </RadioButtonController>
  );
}

asLarge.story = {
  name: 'As large.',
};

export function handlesInvalidStateWithNoSpacing() {
  return (
    <RadioButtonController
      invalid
      label="Favorite food?"
      name="food"
      onChange={() => console.log('onChange')}
    >
      {(RadioButton) => (
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
      onChange={() => console.log('onChange')}
    >
      {(RadioButton) => (
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
