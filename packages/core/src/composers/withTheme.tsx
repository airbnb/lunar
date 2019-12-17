import { withTheme, WithThemeWrappedProps } from 'aesthetic-react';
import { Theme as BaseTheme } from '../types';

export type WithThemeProps = WithThemeWrappedProps<Theme>;
export type Theme = BaseTheme;

export default withTheme;
