import React from 'react';
import PropTypes from 'prop-types';
import { DEFAULT_CURRENCY } from '../../constants';
import Price, { CommonProps } from '../Price';
import { Amount } from '../../types';

export type PriceAmountDefinition = {
  [currency: string]: number | Amount;
};

export type Props = CommonProps & {
  /** Object of currencies to amounts. */
  amounts: PriceAmountDefinition;
  /** Character to divide the amounts with. */
  divider?: string;
};

/** Display multiple amounts across different currencies. Supports all props in `Price`. */
export default class PriceGroup extends React.PureComponent<Props> {
  static propTypes = {
    amounts: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.object, PropTypes.number]))
      .isRequired,
  };

  static defaultProps = {
    divider: ', ',
  };

  render() {
    const { amounts, divider, ...restProps } = this.props;
    const { USD, ...amountsWithoutUSD } = amounts;

    // Sort the currencies so that USD is last
    const currencies = Object.keys(amountsWithoutUSD);

    currencies.sort((a, b) => a.localeCompare(b));

    if (typeof USD !== 'undefined') {
      currencies.push(DEFAULT_CURRENCY);
    }

    // Loop through and generate the prices
    const output: JSX.Element[] = [];

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
}
