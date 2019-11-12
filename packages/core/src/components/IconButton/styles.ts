import { StyleSheet } from '../../hooks/useStyles';

const styleSheet: StyleSheet = ({ color, pattern, ui, unit, transition }) => ({
  button: {
    ...pattern.resetButton,
    ...transition.box,
    color: color.core.neutral[6],
    padding: unit / 2,
    borderRadius: ui.borderRadius,

    '@selectors': {
      ':not([disabled]):hover': {
        color: color.core.primary[3],
        backgroundColor: color.accent.bgHover,
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

export default styleSheet;

export { styleSheet };
