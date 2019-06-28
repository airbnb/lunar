import { useThemeFactory } from 'aesthetic-react';
import { Theme as BaseTheme } from '../types';
import Core from '..';

export type Theme = BaseTheme;

export default useThemeFactory(Core.aesthetic);
