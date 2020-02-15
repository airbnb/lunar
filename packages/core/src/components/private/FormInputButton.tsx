import { StyledMutedButton } from '../MutedButton';

// This is a special type of button that matches the styles of input fields,
// and should only be used within forms or alongside inputs.
// Keep these styles in sync with `inputStyleSheet`!
export default StyledMutedButton.extendStyles(({ color, pattern }) => ({
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
}));
