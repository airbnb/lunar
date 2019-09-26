import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import RadioButtonController from './RadioButtonController';
import BaseRadioButton from './RadioButton';

storiesOf('Core/RadioButtonController', module)
  .addParameters({
    inspectComponents: [RadioButtonController, BaseRadioButton],
  })
  .add('Controls multiple radio buttons.', () => (
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
  ))
  .add('Handles invalid state, with no spacing.', () => (
    <RadioButtonController invalid label="Favorite food?" name="food" onChange={action('onChange')}>
      {RadioButton => (
        <div>
          <RadioButton noSpacing label="🍕 Pizza" value="pizza" />
          <RadioButton noSpacing label="🍔 Burger" value="burger" />
          <RadioButton noSpacing label="🍜 Ramen" value="ramen" />
        </div>
      )}
    </RadioButtonController>
  ))
  .add('Handles disabled state, with no spacing.', () => (
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
  ));
