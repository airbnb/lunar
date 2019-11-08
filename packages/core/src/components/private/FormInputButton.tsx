import React from 'react';
import Core from '../..';
import { StyleSheet } from '../../hooks/useStyles';
import { Props } from '../Button';
import MutedButton from '../MutedButton';
import baseStyleSheet from '../MutedButton/styles';

const styleSheet: StyleSheet = Core.aesthetic.extendStyles(
  baseStyleSheet,
  ({ color, pattern }) => ({
    button_invalid: {
      ...pattern.invalid,

      '@selectors': {
        ':not([disabled]):hover': {
          ...pattern.invalid,
        },
      },
    },

    button_inverted: {
      color: color.accent.text,
      borderColor: color.accent.border,

      '@selectors': {
        ':not([disabled]):hover': {
          color: color.accent.text,
          borderColor: color.accent.borderHover,
        },
      },
    },
  }),
);

// This is a special type of button that matches the styles of input fields,
// and should only be used within forms or alongside inputs.
// Keep these styles in sync with `buildInputStyles`!
export default function FormInputButton({ children, ...props }: Props) {
  return (
    <MutedButton {...props} styleSheet={styleSheet}>
      {children}
    </MutedButton>
  );
}
