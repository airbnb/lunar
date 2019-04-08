import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import RadioButtonController from './RadioButtonController';

storiesOf('Core/RadioButtonController', module)
  .add('Controls multiple radio buttons.', () => (
    <RadioButtonController
      label="Favorite food?"
      name="food"
      onChange={action('onChange')}
      optional
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
    <RadioButtonController label="Favorite food?" name="food" onChange={action('onChange')} invalid>
      {RadioButton => (
        <div>
          <RadioButton label="🍕 Pizza" value="pizza" noSpacing />
          <RadioButton label="🍔 Burger" value="burger" noSpacing />
          <RadioButton label="🍜 Ramen" value="ramen" noSpacing />
        </div>
      )}
    </RadioButtonController>
  ))
  .add('Handles disabled state, with no spacing.', () => (
    <RadioButtonController
      label="Favorite food?"
      name="food"
      onChange={action('onChange')}
      disabled
    >
      {RadioButton => (
        <div>
          <RadioButton label="🍕 Pizza" value="pizza" noSpacing />
          <RadioButton label="🍔 Burger" value="burger" noSpacing />
          <RadioButton label="🍜 Ramen" value="ramen" noSpacing />
        </div>
      )}
    </RadioButtonController>
  ));
