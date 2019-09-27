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
