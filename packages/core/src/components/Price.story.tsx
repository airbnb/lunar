import React from 'react';
import { storiesOf } from '@storybook/react';
import Price from './Price';

storiesOf('Core/Price', module)
  .addParameters({
    inspectComponents: [Price],
  })
  .add('Standard amount.', () => <Price amount={123.45} currency="USD" />)
  .add('Cents-enabled (micros) amount in GBP.', () => (
    <Price micros amount={123450000} currency="GBP" />
  ))
  .add('Rounded amount in JPY.', () => (
    <Price round amount={12300.45} currency="JPY" locale="ja" />
  ));
