import { useTheme as baseUseTheme } from 'aesthetic-react';
import { Theme as BaseTheme } from '../types';

export type Theme = BaseTheme;

export default function useTheme() {
  return baseUseTheme<Theme>();
}
