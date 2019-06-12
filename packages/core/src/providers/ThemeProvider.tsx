import React from 'react';
import { ThemeProvider as BaseThemeProvider } from 'aesthetic-react';
import Core from '..';

export type Props = {
  children: NonNullable<React.ReactNode>;
};

export default function ThemeProvider({ children }: Props) {
  return <BaseThemeProvider aesthetic={Core.aesthetic}>{children}</BaseThemeProvider>;
}
