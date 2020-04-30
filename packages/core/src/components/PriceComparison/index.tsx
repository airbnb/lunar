import React from 'react';
import PropTypes from 'prop-types';
import { DEFAULT_CURRENCY } from '../../constants';
import Empty from '../Empty';
import PriceGroup from '../PriceGroup';
import { Amount } from '../../types';
import { CommonProps } from '../Price';

export type PriceComparisonProps = CommonProps & {
  /** The amount as a number. */
  amount?: Amount | number | null | string;
  /** The amount in USD. */
  amountUSD?: Amount | number | null | string;
  /** Native currency of the amount. */
  currency?: string;
};

/** Display a comparison between USD and native amounts. Supports all props in `Price`. */
function PriceComparison({
  amount,
  amountUSD,
  currency = DEFAULT_CURRENCY,
  ...restProps
}: PriceComparisonProps) {
  const amounts: { [curreny: string]: Amount | number } = {};
  const hasPrice = amount !== null && amount !== undefined;
  const hasPriceUSD = amountUSD !== null && amountUSD !== undefined;
  const targetCurrency = amount && typeof amount === 'object' ? amount.currency : currency!;

  if (
    (typeof amount === 'string' && isNaN(Number(amount))) ||
    (typeof amountUSD === 'string' && isNaN(Number(amountUSD)))
  ) {
    return <Empty />;
  }

  // Sometimes the native price could be empty
  if (hasPrice) {
    amounts[targetCurrency] = typeof amount === 'string' ? Number(amount) : amount!;
  }

  // Show the USD price if the native price is empty, or if the currencies don't match
  if (hasPriceUSD && (!hasPrice || targetCurrency !== DEFAULT_CURRENCY)) {
    amounts[DEFAULT_CURRENCY] = typeof amountUSD === 'string' ? Number(amountUSD) : amountUSD!;
  }

  return <PriceGroup {...restProps} amounts={amounts} />;
}

PriceComparison.propTypes = {
  amount: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.string]),
  amountUSD: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.string]),
};

export default PriceComparison;
