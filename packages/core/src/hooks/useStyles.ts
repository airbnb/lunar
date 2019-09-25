import { StyleSheetDefinition } from 'aesthetic';
import { useStylesFactory } from 'aesthetic-react';
import { Theme as BaseTheme } from '../types';
import Core from '..';

export type Theme = BaseTheme;
export type StyleSheet = StyleSheetDefinition<Theme, {}>;

// eslint-disable-next-line react-hooks/rules-of-hooks
export default useStylesFactory(Core.aesthetic);
