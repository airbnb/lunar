import React from 'react';
import Price from '.';

export default {
  title: 'Core/Price',
  parameters: {
    inspectComponents: [Price],
  },
};

export function standardAmount() {
  return <Price amount={123.45} currency="USD" />;
}

standardAmount.story = {
  name: 'Standard amount.',
};

export function centsEnabledMicrosAmountInGbp() {
  return <Price micros amount={123450000} currency="GBP" />;
}

centsEnabledMicrosAmountInGbp.story = {
  name: 'Cents-enabled (micros) amount in GBP.',
};

export function roundedAmountInJpy() {
  return <Price round amount={12300.45} currency="JPY" locale="ja" />;
}

roundedAmountInJpy.story = {
  name: 'Rounded amount in JPY.',
};

export function withAnInvalidAmount() {
  // @ts-ignore invalid amount type on purprose to demonstrate the fallback
  return <Price amount="[Hidden]" currency="USD" />;
}

withAnInvalidAmount.story = {
  name: 'Fallback when an invalid amount is provided.',
};

export function withAnInvalidCurrency() {
  // @ts-ignore invalid amount type on purprose to demonstrate the fallback
  return <Price amount={100} currency="[Hidden]" />;
}

withAnInvalidCurrency.story = {
  name: 'Fallback when an invalid currency is provided.',
};
