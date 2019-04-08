import React from 'react';
import { storiesOf } from '@storybook/react';
import Price from './Price';

storiesOf('Core/Price', module)
  .add('Standard amount.', () => <Price amount={123.45} currency="USD" />)
  .add('Cents-enabled (micros) amount in GBP.', () => (
    <Price amount={123450000} currency="GBP" micros />
  ))
  .add('Rounded amount in JPY.', () => (
    <Price amount={12300.45} currency="JPY" locale="ja" round />
  ));
