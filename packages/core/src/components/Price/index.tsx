import React from 'react';
import PropTypes from 'prop-types';
import { DEFAULT_CURRENCY, MICROS } from '../../constants';
import { Currency, PriceType, Amount, Locale } from '../../types';
import formatPrice from '../../utils/formatPrice';
import Empty from '../Empty';
import Core from '../..';

export type CommonProps = {
  /** Type of currenct display to use. */
  display?: PriceType;
  /** Locale of the user viewing the price. */
  locale?: Locale;
  /** Whether the price is cents enabled (micros million precision). */
  micros?: boolean;
  /** Precision of decimal places to round to. */
  precision?: number;
  /** Whether to round to a while number. */
  round?: boolean;
  /** Whether to trim trailing zeros from cents. */
  trimTrailingZeros?: boolean;
};

export type PriceProps = CommonProps & {
  /** The amount as a number. */
  amount?: Amount | number | null;
  /** Native currency of the amount. */
  currency?: Currency;
};

/** Display a formatted and localized currency or price amount. */
export default class Price extends React.PureComponent<PriceProps> {
  static propTypes = {
    amount: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    display: PropTypes.oneOf(['symbol', 'code', 'name']),
  };

  static defaultProps = {
    currency: DEFAULT_CURRENCY,
    display: 'symbol',
    locale: undefined,
    micros: false,
    precision: 0,
    round: false,
    trimTrailingZeros: false,
  };

  render() {
    const {
      amount: baseAmount,
      currency: baseCurrency,
      micros: baseMicros,
      display,
      locale,
      precision,
      round,
      trimTrailingZeros,
    } = this.props;
    let amount = 0;
    let currency = baseCurrency;
    let micros = baseMicros;

    if (baseAmount === undefined || baseAmount === null) {
      return <Empty />;
    }

    if (typeof baseAmount === 'object') {
      currency = baseAmount.currency;
      micros = baseAmount.is_micros_accuracy;
      amount = micros ? baseAmount.amount_micros : baseAmount.amount;
    } else if (typeof baseAmount === 'number') {
      amount = baseAmount;
    }

    if (micros) {
      amount /= MICROS;
    }

    return (
      <span>
        {formatPrice(amount, currency, {
          display,
          precision,
          round,
          trimTrailingZeros,
          locale: locale || Core.locale(),
        })}
      </span>
    );
  }
}
