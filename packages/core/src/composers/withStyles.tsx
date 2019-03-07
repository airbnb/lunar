import {
  ClassName,
  StyleSheetDefinition,
  WithStylesOptions,
  WithStylesProps as BaseWithStylesProps,
} from 'aesthetic';
import { NativeBlock, ParsedBlock } from 'aesthetic-adapter-aphrodite';
import Core from '..';
import { Theme } from '../types';

export type WithStylesProps = BaseWithStylesProps<Theme, ParsedBlock>;

export function css(
  ...styles: (undefined | false | NativeBlock | ParsedBlock)[]
): { className: ClassName } {
  return { className: Core.getAesthetic().transformStyles(...styles) };
}

export default function withStyles<T>(
  styleSheet: StyleSheetDefinition<Theme, T>,
  options?: WithStylesOptions,
) /* infer */ {
  return Core.getAesthetic().withStyles(styleSheet, options);
}
