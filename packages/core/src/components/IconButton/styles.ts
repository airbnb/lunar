import { StyleSheet } from '../../hooks/useStyles';

export const styleSheetIconButton: StyleSheet = ({ color, pattern, ui, unit, transition }) => ({
  button: {
    ...pattern.resetButton,
    ...transition.box,
    color: color.core.neutral[6],
    padding: unit / 2,
    borderRadius: ui.borderRadius,

    '@selectors': {
      ':not([disabled]):hover, :focus': {
        color: color.core.primary[3],
        backgroundColor: color.accent.bgHover,
      },

      ':focus': {
        ...pattern.themedFocus,
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
