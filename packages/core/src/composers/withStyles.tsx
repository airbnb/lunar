import { withStyles, WithStylesWrappedProps } from 'aesthetic-react';
import { Theme as BaseTheme } from '../types';

export type WithStylesProps = WithStylesWrappedProps<BaseTheme>;
export type Theme = BaseTheme;

export default withStyles;
