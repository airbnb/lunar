/* eslint-disable no-dupe-keys */
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
            JPY: {
              amount: 456,
              amount_micros: 456000000,
              amount_formatted: '',
              currency: 'JPY',
              is_micros_accuracy: true,
            },
          }}
        />
      </div>
    </div>
  );
}

withAnInvalidAmount.story = {
  name: 'Fallback when invalid amounts are provided.',
};

export function withInvalidCurrencies() {
  return (
    <div>
      <div>
        If all currencies are invalid, one empty:{' '}
        <PriceGroup
          amounts={{
            '[Hidden]': 123,
            // @ts-ignore duplicate on purpose to demonstrate invalid state
            '[Hidden]': 123,
            // @ts-ignore duplicate on purpose to demonstrate invalid state
            '[Hidden]': 123,
            // @ts-ignore duplicate on purpose to demonstrate invalid state
            '[Hidden]': 123,
          }}
        />
      </div>

      <div>
        If some currencies are invalid:{' '}
        <PriceGroup
          amounts={{
            '[Hidden1]': 123.45,
            EUR: 345.67,
            // @ts-ignore duplicate on purpose to demonstrate invalid state
            '[Hidden2]': 567.89,
            JPY: 12345,
          }}
        />
      </div>
    </div>
  );
}

withInvalidCurrencies.story = {
  name: 'Fallback when invalid currencies are provided.',
};
