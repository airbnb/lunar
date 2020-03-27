/* eslint-disable camelcase */

import React from 'react';
import { DateTime } from 'luxon';
import { StyleBlock } from 'aesthetic';

export type Logger = (error: Error, extra: object) => void;

export type Translator = (
  key: string,
  phrase: string,
  params?: TranslateParams,
  options?: TranslateOptions,
) => string;

export type ErrorType =
  | {
      error_id?: string;
      error_code?: number | string;
      error_message?: string;
      error_details?: string;
      error_url?: string;
      debug_info?: { [key: string]: string };
      user_message?: string;
    }
  | Error;

export type StatusType = 'notice' | 'info' | 'success' | 'warning' | 'danger' | 'muted';

export type BrandType = 'luxury' | 'plus';

// I18N

export type TranslateParams = { [param: string]: string | number | undefined };

export type TranslateOptions = {
  /** Phrase message contains HTML. */
  html?: boolean;
};

export type TranslateProps = {
  [param: string]: string | number | boolean | undefined | React.ReactNode;
  /** Unique phrase key. */
  k: string;
  /** Default phrase to translate. */
  phrase: string;
  /** Handle counts using a smart number. */
  smartCount?: number;
} & TranslateOptions;

// MONEY

export type Currency = string;

export type Amount = {
  amount: number;
  amount_formatted: string;
  amount_micros: number;
  currency: string;
  is_micros_accuracy: boolean;
};

export type PriceType = 'code' | 'name' | 'symbol';

// DATETIME

export type TimeZone = string;
export type DateTimeType = null | string | number | Date | DateTime;

// LOCALIZATION

export type Locale =
  | 'de'
  | 'en'
  | 'es'
  | 'fr'
  | 'it'
  | 'ja'
  | 'ko'
  | 'ms'
  | 'nl'
  | 'pt'
  | 'ru'
  | 'tr'
  | 'zh';

export type LocaleDefinition = {
  locale: string;
  label: string;
  name?: string;
};

// THEMES

export type Hexcode = string;

export type ColorRange = [Hexcode, Hexcode, Hexcode, Hexcode, Hexcode, Hexcode, Hexcode];

export type Theme = {
  color: {
    accent: {
      bg: Hexcode;
      bgHover: Hexcode;
      bgError: Hexcode;
      blackout: string;
      border: Hexcode;
      borderActive: Hexcode;
      borderHover: Hexcode;
      borderError: Hexcode;
      outline: Hexcode;
      text: Hexcode;
      textActive: Hexcode;
      textError: Hexcode;
    };
    base: Hexcode;
    brand: {
      luxury: ColorRange;
      plus: ColorRange;
    };
    core: {
      danger: ColorRange;
      neutral: ColorRange;
      primary: ColorRange;
      secondary: ColorRange;
      success: ColorRange;
      warning: ColorRange;
    };
    clear: Hexcode;
    muted: Hexcode;
  };
  font: {
    fontFamily: string;
    title1: StyleBlock;
    title2: StyleBlock;
    title3: StyleBlock;
    textLarge: StyleBlock;
    textRegular: StyleBlock;
    textSmall: StyleBlock;
    textMicro: StyleBlock;
    textReset: StyleBlock;
    weights: {
      thin: number;
      light: number;
      medium: number;
      semibold: number;
      bold: number;
      black: number;
    };
  };
  pattern: {
    box: StyleBlock;
    disabled: StyleBlock;
    focused: StyleBlock;
    themedFocus: StyleBlock;
    invalid: StyleBlock;
    offscreen: StyleBlock;
    resetButton: StyleBlock;
    smallButton: StyleBlock;
    regularButton: StyleBlock;
    largeButton: StyleBlock;
  };
  breakpoints: {
    [name: string]: number;
  };
  responsive: {
    large: string;
    medium: string;
    small: string;
    xsmall: string;
  };
  transition: {
    box: StyleBlock;
    fade: StyleBlock;
  };
  ui: {
    border: string;
    borderThick: string;
    borderRadius: number;
    borderRadiusRounded: number;
    borderRadiusThick: number;
    borderWidth: number;
    borderWidthThick: number;
    boxShadow: string;
    boxShadowMedium: string;
    boxShadowLarge: string;
    disabledOpacity: number;
    transitionTime: string;
  };
  unit: number;
};
