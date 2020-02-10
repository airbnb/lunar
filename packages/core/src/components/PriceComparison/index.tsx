import React from 'react';
import PropTypes from 'prop-types';
import { DEFAULT_CURRENCY } from '../../constants';
import PriceGroup from '../PriceGroup';
import { Amount } from '../../types';
import { CommonProps } from '../Price';

export type PriceComparisonProps = CommonProps & {
  /** The amount as a number. */
  amount?: Amount | number | null;
  /** The amount in USD. */
  amountUSD?: Amount | number | null;
  /** Native currency of the amount. */
  currency?: string;
};

/** Display a comparison between USD and native amounts. Supports all props in `Price`. */
export default class PriceComparison extends React.PureComponent<PriceComparisonProps> {
  static propTypes = {
    amount: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    amountUSD: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  };

  static defaultProps = {
    amount: null,
    amountUSD: null,
    currency: DEFAULT_CURRENCY,
  };

  render() {
    const { amount, amountUSD, currency, ...restProps } = this.props;
    const amounts: { [curreny: string]: Amount | number } = {};
    const hasPrice = amount !== null && amount !== undefined;
    const hasPriceUSD = amountUSD !== null && amountUSD !== undefined;
    const targetCurrency = amount && typeof amount === 'object' ? amount.currency : currency!;

    // Sometimes the native price could be empty
    if (hasPrice) {
      amounts[targetCurrency] = amount!;
    }

    // Show the USD price if the native price is empty, or if the currencies don't match
    if (hasPriceUSD && (!hasPrice || targetCurrency !== DEFAULT_CURRENCY)) {
      amounts[DEFAULT_CURRENCY] = amountUSD!;
    }

    return <PriceGroup {...restProps} amounts={amounts} />;
  }
}
