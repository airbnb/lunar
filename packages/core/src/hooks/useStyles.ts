import { StyleSheetFactory } from 'aesthetic';
import { useStyles as baseUseStyles, UseStylesOptions } from 'aesthetic-react';
import { Theme as BaseTheme } from '../types';

export type Theme = BaseTheme;
export type StyleSheet<T = unknown> = StyleSheetFactory<Theme, T>;

export default function useStyles<T>(styleSheet: StyleSheet<T>, options?: UseStylesOptions) {
  return baseUseStyles<Theme, T>(styleSheet, options);
}
