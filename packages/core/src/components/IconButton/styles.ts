import { StyleSheet } from '../../hooks/useStyles';

export const styleSheetIconButton: StyleSheet = ({ color, pattern, ui, unit, transition }) => ({
  button: {
    ...pattern.resetButton,
    ...transition.box,
    color: color.core.neutral[6],
    padding: unit / 2,
    borderRadius: ui.borderRadius,

    '@selectors': {
      ':not([disabled]):hover, :not([disabled]):focus': {
        color: color.core.primary[3],
        backgroundColor: color.accent.bgHover,
      },

      ':not([disabled]):focus': {
        ...pattern.themedFocus, // needed for `a`
      },
    },
  },

  button_active: {
    color: color.core.primary[3],
  },

  button_inverted: {
    color: color.base,
  },

  button_disabled: {
    ...pattern.disabled,
  },
});
