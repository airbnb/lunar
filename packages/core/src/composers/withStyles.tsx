import { StyleSheetFactory } from 'aesthetic';
import {
  withStyles as baseWithStyles,
  WithStylesWrappedProps,
  WithStylesOptions,
} from 'aesthetic-react';
import { Theme as BaseTheme } from '../types';

export type Theme = BaseTheme;
export type StyleSheet<T = unknown> = StyleSheetFactory<Theme, T>;
export type WithStylesProps = WithStylesWrappedProps<Theme>;

export default function withStyles<T>(
  styleSheet: StyleSheetFactory<Theme, T>,
  options?: WithStylesOptions,
) {
  return baseWithStyles<Theme, T>(styleSheet, options);
}
