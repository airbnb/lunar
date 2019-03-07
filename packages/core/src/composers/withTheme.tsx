import { WithThemeOptions, WithThemeProps as BaseWithThemeProps } from 'aesthetic';
import Core from '..';
import { Theme } from '../types';

export type WithThemeProps = BaseWithThemeProps<Theme>;

export default function withTheme(options?: WithThemeOptions) /* infer */ {
  return Core.getAesthetic().withTheme(options);
}
