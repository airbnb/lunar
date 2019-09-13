import { useThemeFactory } from 'aesthetic-react';
import { Theme as BaseTheme } from '../types';
import Core from '..';

export type Theme = BaseTheme;

// eslint-disable-next-line react-hooks/rules-of-hooks
export default useThemeFactory(Core.aesthetic);
