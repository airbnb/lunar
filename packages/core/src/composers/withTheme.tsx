import { withThemeFactory, WithThemeWrappedProps } from 'aesthetic-react';
import { Theme as BaseTheme } from '../types';
import Core from '..';

export type WithThemeProps = WithThemeWrappedProps<Theme>;
export type Theme = BaseTheme;

export default withThemeFactory(Core.aesthetic);
