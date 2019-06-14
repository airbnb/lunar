import React from 'react';
import { ThemeProvider as BaseThemeProvider, ThemeContext } from 'aesthetic-react';
import Core from '..';

export { ThemeContext };

export type Props = {
  children: NonNullable<React.ReactNode>;
  name?: string;
};

export default function ThemeProvider({ children, name }: Props) {
  return (
    <BaseThemeProvider aesthetic={Core.aesthetic} name={name}>
      {children}
    </BaseThemeProvider>
  );
}
