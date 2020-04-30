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

export function withAnInvalidAmount() {
  return (
    <div>
      <div>
        If all amounts are invalid, one empty:{' '}
        <PriceGroup
          amounts={{
            // @ts-ignore amount type on purprose to demonstrate the fallback
            USD: '[Hidden]',
            // @ts-ignore amount type on purprose to demonstrate the fallback
            EUR: '[Hidden]',
            // @ts-ignore amount type on purprose to demonstrate the fallback
            GBP: '[Hidden]',
            // @ts-ignore amount type on purprose to demonstrate the fallback
            JPY: '[Hidden]',
          }}
        />
      </div>

      <div>
        If some amounts are invalid:{' '}
        <PriceGroup
          amounts={{
            // @ts-ignore amount type on purprose to demonstrate the fallback
            USD: '[Hidden]',
            EUR: 345.67,
            // @ts-ignore amount type on purprose to demonstrate the fallback
            GBP: '[Hidden]',
            JPY: 12345,
          }}
        />
      </div>
    </div>
  );
}

withAnInvalidAmount.story = {
  name: 'Fallback when invalid amounts are provided.',
};
