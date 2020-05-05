import { Currency, Locale, PriceType } from '../types';
import Core from '..';

export type Options = {
  display?: PriceType;
  precision?: number;
  round?: boolean;
  trimTrailingZeros?: boolean;
  locale?: Locale;
};

export default function formatPrice(
  price: number | string,
  currency?: Currency,
  options: Options = {},
): string | undefined {
  const locale = options.locale || Core.locale();
  const priceNum = Number(price);
  const negative = priceNum < 0;
  let amount = priceNum;

  // Prepare the amount
  if (options.round) {
    amount = Math.round(amount);
  } else if (options.precision) {
    amount = parseFloat(Number(price).toFixed(options.precision));
  }

  // We dont want to show the minus sign
  if (negative) {
    amount = Math.abs(amount);
  }

  try {
    let amountStr = '';

    // Format as a currency
    if (currency) {
      amountStr = amount.toLocaleString(locale, {
        style: 'currency',
        currency,
        currencyDisplay: options.display || 'symbol',
      });

      // Format as a number
    } else {
      amountStr = amount.toLocaleString(locale);
    }

    // Remove ending zeros
    if (options.trimTrailingZeros) {
      amountStr = amountStr.replace(/\.0+$/, '');
    }

    // Wrap the value in parenthesis if negative
    if (negative) {
      amountStr = `(${amountStr})`;
    }

    return amountStr;
  } catch (error) {
    if (__DEV__) {
      // eslint-disable-next-line no-console
      console.error(error);
    }

    return undefined;
  }
}
