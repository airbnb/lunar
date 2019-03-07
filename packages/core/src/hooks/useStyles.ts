import { StyleSheetDefinition } from 'aesthetic';
import Core from '..';
import { Theme } from '../types';

export default function useStyles<T>(
  styleSheet: StyleSheetDefinition<Theme, T>,
  customName?: string,
) /* infer */ {
  return Core.getAesthetic().useStyles<T>(styleSheet, customName);
}
