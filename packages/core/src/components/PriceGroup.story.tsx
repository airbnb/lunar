import React from 'react';
import { storiesOf } from '@storybook/react';
import PriceGroup from './PriceGroup';

storiesOf('Core/PriceGroup', module).add('Multiple currency amounts.', () => (
  <PriceGroup
    amounts={{
      USD: 123.45,
      EUR: 345.67,
      GBP: 567.89,
      JPY: 12345,
    }}
  />
));
