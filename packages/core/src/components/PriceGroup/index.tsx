import React from 'react';
import { DEFAULT_CURRENCY } from '../../constants';
import Empty from '../Empty';
import Price, { CommonProps } from '../Price';
import { Amount } from '../../types';
import formatPrice from '../../utils/formatPrice';

export type PriceAmountDefinition = {
  [currency: string]: Amount | number | string;
};

export type PriceGroupProps = CommonProps & {
  /** Object of currencies to amounts. */
  amounts: PriceAmountDefinition;
  /** Character to divide the amounts with. */
  divider?: string;
};

/** Display multiple amounts across different currencies. Supports all props in `Price`. */
export default function PriceGroup({ amounts, divider = ', ', ...restProps }: PriceGroupProps) {
  const { USD, ...amountsWithoutUSD } = amounts;

  // Sort the currencies so that USD is last
  const currencies = Object.keys(amountsWithoutUSD);

  currencies.sort((a, b) => a.localeCompare(b));

  if (USD !== undefined) {
    currencies.push(DEFAULT_CURRENCY);
  }

  // Loop through and generate the prices
  const output: JSX.Element[] = [];
  let invalidAmounts = 0;

  currencies.forEach((currency) => {
    const amount = amounts[currency];
    if (
      ((typeof amount === 'string' || typeof amount === 'number') &&
        !formatPrice(amount, currency, { display: 'symbol' })) ||
      (typeof amount === 'string' && isNaN(Number(amount)))
    ) {
      invalidAmounts += 1;
    }
  });

  if (invalidAmounts === currencies.length) {
    return <Empty />;
  }

  currencies.forEach((currency, i) => {
    if (i > 0) {
      output.push(<span key={`divider-${currency}`}>{divider}</span>);
    }

    output.push(
      <Price key={currency} {...restProps} amount={amounts[currency]} currency={currency} />,
    );
  });

  return <span>{output}</span>;
}
