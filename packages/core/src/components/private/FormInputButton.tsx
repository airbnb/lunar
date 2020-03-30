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
      },
    },

    button_inverted: {
      color: color.accent.text,
      borderColor: color.accent.border,

      '@selectors': {
        ':not([disabled]):hover, :not([disabled]):focus': {
          color: color.accent.text,
          borderColor: color.accent.borderHover,
        },
      },
    },

    button_invalid: {
      ...pattern.invalid,

      '@selectors': {
        ':not([disabled]):hover, :not([disabled]):focus': {
          ...pattern.invalid,
        },
      },
    },
  }),
);

export default function FormInputButton({ children, ...props }: ButtonProps) {
  return (
    <Button {...props} styleSheet={styleSheet}>
      {children}
    </Button>
  );
}
