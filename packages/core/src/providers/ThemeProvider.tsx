import React from 'react';
import {
  ThemeProvider as BaseThemeProvider,
  ThemeProviderProps,
  ThemeContext,
} from 'aesthetic-react';
import { Omit } from 'utility-types';
import Core from '..';

export { ThemeContext };

export type Props = Omit<ThemeProviderProps, 'aesthetic'>;

export default function ThemeProvider({ children, ...props }: Props) {
  return (
    <BaseThemeProvider aesthetic={Core.aesthetic} {...props}>
      {children}
    </BaseThemeProvider>
  );
}
