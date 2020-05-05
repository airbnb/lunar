import React from 'react';
import PriceComparison from '.';

export default {
  title: 'Core/PriceComparison',
  parameters: {
    inspectComponents: [PriceComparison],
  },
};

export function bothNativeAndUsdAmounts() {
  return <PriceComparison amount={123} amountUSD={123} currency="EUR" />;
}

bothNativeAndUsdAmounts.story = {
  name: 'Both native and USD amounts.',
};

export function onlyNativeAmounts() {
  return <PriceComparison amount={123} currency="EUR" />;
}

onlyNativeAmounts.story = {
  name: 'Only native amounts.',
};

export function onlyUsdAmounts() {
  return <PriceComparison amountUSD={123} currency="EUR" />;
}

onlyUsdAmounts.story = {
  name: 'Only USD amounts.',
};

export function withAnInvalidAmount() {
  return (
    <div>
      {/* invalid amount type on purprose to demonstrate the fallback
      // @ts-ignore */}
      Both native and USD amounts:{' '}
      <PriceComparison amount="[Hidden]" amountUSD="[Hidden]" currency="EUR" />
      <br />
      {/* invalid amount type on purprose to demonstrate the fallback
      // @ts-ignore */}
      Only native amounts: <PriceComparison amount="[Hidden]" currency="EUR" />
      <br />
      {/* invalid amount type on purprose to demonstrate the fallback
      // @ts-ignore */}
      Only USD amounts: <PriceComparison amountUSD="[Hidden]" currency="EUR" />
    </div>
  );
}

withAnInvalidAmount.story = {
  name: 'Fallback when invalid amounts are provided.',
};

export function withAnInvalidCurrency() {
  return (
    <div>
      {/* invalid amount type on purprose to demonstrate the fallback
      // @ts-ignore */}
      Both native and USD amounts:{' '}
      <PriceComparison amount={123} amountUSD={123} currency="[Hidden]" />
      <br />
      {/* invalid amount type on purprose to demonstrate the fallback
      // @ts-ignore */}
      Only native amounts: <PriceComparison amount={123} currency="[Hidden]" />
      <br />
      {/* invalid amount type on purprose to demonstrate the fallback
      // @ts-ignore */}
      Only USD amounts: <PriceComparison amountUSD={123} currency="[Hidden]" />
    </div>
  );
}

withAnInvalidCurrency.story = {
  name: 'Fallback when invalid currencies are provided.',
};
