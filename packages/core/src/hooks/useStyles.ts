import { StyleSheetDefinition } from 'aesthetic';
import { useStylesFactory } from 'aesthetic-react';
import { Theme as BaseTheme } from '../types';
import Core from '..';

export type Theme = BaseTheme;
export type StyleSheet = StyleSheetDefinition<Theme, any>;

export default useStylesFactory(Core.aesthetic);
