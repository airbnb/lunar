import React from 'react';
import aesthetic from 'aesthetic';
import { StyleSheet } from '../../hooks/useStyles';
import Button, { ButtonProps } from '../Button';
import { buttonStyleSheet } from '../Button/styles';

const styleSheet: StyleSheet = aesthetic.extendStyles(
  buttonStyleSheet,
  ({ color, pattern, ui }) => ({
    button: {
      backgroundColor: color.core.neutral[5],
      border: `${ui.borderWidthThick}px solid ${color.core.neutral[5]}`,

      '@selectors': {
        ':not([disabled]):hover, :not([disabled]):focus': {
          backgroundColor: color.core.neutral[6],
          borderColor: color.core.neutral[6],
        },

        ':not([disabled]):focus': {
          ...pattern.themedFocus, // needed for `a`
        },
      },
    },

    button_inverted: {
      color: color.core.neutral[5],
      backgroundColor: color.accent.bg,

      '@selectors': {
        ':not([disabled]):hover, :not([disabled]):focus': {
          color: color.core.neutral[6],
          backgroundColor: color.accent.bgHover,
        },
      },
    },
  }),
);

/** A button to use for secondary actions. Supports all the same props as `Button`. */
export default function MutedButton({ children, ...props }: ButtonProps) {
  return (
    <Button {...props} styleSheet={styleSheet}>
      {children}
    </Button>
  );
}
