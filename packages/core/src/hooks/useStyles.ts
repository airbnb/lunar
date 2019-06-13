import { useStylesFactory } from 'aesthetic-react';
import { Theme as BaseTheme } from '../types';
import Core from '..';

export type Theme = BaseTheme;

export default useStylesFactory(Core.aesthetic);
