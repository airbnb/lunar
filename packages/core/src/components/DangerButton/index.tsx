import React from 'react';
import aesthetic from 'aesthetic';
import { StyleSheet } from '../../hooks/useStyles';
import Button, { ButtonProps } from '../Button';
import { buttonStyleSheet } from '../Button/styles';

const styleSheet: StyleSheet = aesthetic.extendStyles(buttonStyleSheet, ({ color, ui }) => ({
  button: {
    backgroundColor: color.core.danger[5],
    border: `${ui.borderWidthThick}px solid ${color.core.danger[5]}`,

    '@selectors': {
      ':focus': {
        backgroundColor: color.core.danger[6],
      },

      ':not([disabled]):hover': {
        backgroundColor: color.core.danger[6],
        borderColor: color.core.danger[6],
      },
    },
  },

  button_inverted: {
    color: color.core.danger[5],
    backgroundColor: color.accent.bg,

    '@selectors': {
      ':focus': {
        backgroundColor: color.accent.bgHover,
      },

      ':not([disabled]):hover': {
        color: color.core.danger[6],
        backgroundColor: color.accent.bgHover,
      },
    },
  },
}));

/** A button to use for primary actions. Supports all the same props as `Button`. */
export default function DangerButton({ children, ...props }: ButtonProps) {
  return (
    <Button {...props} styleSheet={styleSheet}>
      {children}
    </Button>
  );
}
