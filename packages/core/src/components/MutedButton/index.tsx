import React from 'react';
import Button, { ButtonProps } from '../Button';

export const StyledMutedButton = Button.extendStyles(({ color }) => ({
  button: {
    backgroundColor: color.core.neutral[5],
    border: `2px solid ${color.core.neutral[5]}`,

    '@selectors': {
      ':not([disabled]):hover': {
        backgroundColor: color.core.neutral[6],
        borderColor: color.core.neutral[6],
      },
    },
  },

  button_inverted: {
    color: color.core.neutral[5],
    backgroundColor: color.accent.bg,

    '@selectors': {
      ':not([disabled]):hover': {
        color: color.core.neutral[6],
        backgroundColor: color.accent.bgHover,
      },
    },
  },
}));

/** A button to use for secondary actions. Supports all the same props as `Button`. */
export default function MutedButton({ children, ...props }: ButtonProps) {
  return <StyledMutedButton {...props}>{children}</StyledMutedButton>;
}
