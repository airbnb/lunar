import { withTheme as baseWithTheme, WithThemeWrappedProps } from 'aesthetic-react';
import { Theme as BaseTheme } from '../types';

export type Theme = BaseTheme;
export type WithThemeProps = WithThemeWrappedProps<Theme>;

export default function withTheme() {
  return baseWithTheme<Theme>();
}
