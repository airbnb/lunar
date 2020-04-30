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
  amount?: Amount | number | null | string;
  /** Native currency of the amount. */
  currency?: Currency;
};

/** Display a formatted and localized currency or price amount. */
function Price({
  amount: baseAmount,
  currency: baseCurrency = DEFAULT_CURRENCY,
  micros: baseMicros,
  display = 'symbol',
  locale,
  precision = 0,
  round,
  trimTrailingZeros,
}: PriceProps) {
  let amount = 0;
  let currency = baseCurrency;
  let micros = baseMicros;

  if (
    baseAmount === undefined ||
    baseAmount === null ||
    (typeof baseAmount === 'string' && isNaN(Number(baseAmount)))
  ) {
    return <Empty />;
  }

  if (typeof baseAmount === 'object') {
    currency = baseAmount.currency;
    micros = baseAmount.is_micros_accuracy;
    amount = micros ? baseAmount.amount_micros : baseAmount.amount;
  } else if (typeof baseAmount === 'string') {
    amount = Number(baseAmount);
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

Price.propTypes = {
  amount: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.string]),
  display: PropTypes.oneOf(['symbol', 'code', 'name']),
};

export default Price;
