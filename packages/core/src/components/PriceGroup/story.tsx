import React from 'react';
import PriceGroup from '.';

export default {
  title: 'Core/PriceGroup',
  parameters: {
    inspectComponents: [PriceGroup],
  },
};

export function multipleCurrencyAmounts() {
  return (
    <PriceGroup
      amounts={{
        USD: 123.45,
        EUR: 345.67,
        GBP: 567.89,
        JPY: 12345,
      }}
    />
  );
}

multipleCurrencyAmounts.story = {
  name: 'Multiple currency amounts.',
};
