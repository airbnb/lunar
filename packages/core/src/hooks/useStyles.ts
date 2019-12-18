import { StyleSheetFactory } from 'aesthetic';
import { useStyles } from 'aesthetic-react';
import { Theme as BaseTheme } from '../types';

export type Theme = BaseTheme;
export type StyleSheet<T = {}> = StyleSheetFactory<Theme, T>;

export default useStyles;
