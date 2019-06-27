import { StyleBlock } from 'aesthetic';
import { Theme } from '../types';

export default function buildInputStyles({
  color,
  pattern,
  ui,
  unit,
  transition,
}: Theme): { [key: string]: StyleBlock } {
  const common = {
    ...pattern.regularButton,
    ...transition.box,
    color: color.accent.text,
    backgroundColor: color.accent.bg,
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: color.accent.border,
    borderRadius: ui.borderRadius,
    width: '100%',
    display: 'block',

    ':hover': {
      borderColor: color.accent.borderHover,
    },

    ':focus': {
      ...pattern.focused,
    },

    '::placeholder': {
      color: color.muted,
    },

    '::-ms-clear': {
      display: 'none',
    },
  };

  const commonChecked = {
    borderColor: color.core.primary[3],

    '@selectors': {
      ':hover, :focus': {
        borderColor: color.accent.borderActive,
      },
    },
  };

  const commonDisabled = {
    ...pattern.disabled,
    borderColor: color.accent.border,

    '@selectors': {
      ':hover, :focus': {
        borderColor: color.accent.border,
      },
    },

    '::placeholder': {
      color: color.accent.border,
    },
  };

  const commonFocused = {
    ...pattern.focused,

    '@selectors': {
      ':hover, :focus': {
        borderColor: color.accent.borderActive,
      },
    },
  };

  const commonInvalid = {
    ...pattern.invalid,

    '@selectors': {
      ':hover, :focus': {
        borderColor: color.accent.borderError,
      },
    },

    '::placeholder': {
      color: color.accent.textError,
    },
  };

  const commonNeutral = {
    borderColor: color.core.neutral[4],

    '@selectors': {
      ':hover, :focus': {
        borderColor: color.core.neutral[4],
      },
    },
  };

  return {
    input: {
      ...common,
    },

    input_important: {
      backgroundColor: color.core.danger[0],
    },

    input_compact: {
      ...pattern.smallButton,
    },

    input_focused: {
      ...commonFocused,
    },

    input_invalid: {
      ...commonInvalid,
    },

    input_disabled: {
      ...commonDisabled,
      backgroundColor: color.core.neutral[0],
      color: color.accent.text,
    },

    input_checked: {
      ...commonChecked,
      backgroundColor: color.core.primary[3],
      color: color.base,
    },

    input_indeterminate: {
      ...commonNeutral,
      backgroundColor: color.core.neutral[4],
      color: color.base,
    },

    // Blur and focus events do not fire for hidden elements,
    // so we must hide it off screen.
    input_hidden: {
      position: 'fixed',
      left: -9999,
    },

    input_hasPrefix: {
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
    },

    input_hasSuffix: {
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
    },

    select: {
      appearance: 'none',
      paddingRight: unit * 4.5,
    },

    select_compact: {
      paddingRight: unit * 3,
    },

    button: {
      ...common,
      padding: unit * 3,
      borderRadius: ui.borderRadiusThick,
      boxShadow: ui.boxShadow,
      cursor: 'pointer',
      display: 'flex',
      width: '100%',
    },

    button_checked: {
      ...commonChecked,
    },

    button_disabled: {
      ...commonDisabled,
    },

    button_focused: {
      ...commonFocused,
    },

    button_invalid: {
      ...commonInvalid,
    },

    button_neutral: {
      ...commonNeutral,
    },
  };
}
