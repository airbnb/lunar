import { withStyles, WithStylesWrappedProps } from 'aesthetic-react';
import { Theme as BaseTheme } from '../types';

export type Theme = BaseTheme;
export type WithStylesProps = WithStylesWrappedProps<Theme>;

export default withStyles;
