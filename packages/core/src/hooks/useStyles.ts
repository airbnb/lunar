import { StyleSheetFactory } from 'aesthetic';
import { useStyles } from 'aesthetic-react';
import { Theme as BaseTheme } from '../types';

export type Theme = BaseTheme;
export type StyleSheet = StyleSheetFactory<Theme, {}>;

export default useStyles;
