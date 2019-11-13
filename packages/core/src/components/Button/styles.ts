import { StyleSheet } from '../../hooks/useStyles';

const styleSheet: StyleSheet = ({ color, font, pattern, ui, unit, transition }) => ({
  button: {
    ...pattern.resetButton,
    ...transition.box,
    fontWeight: font.weights.bold,
    position: 'relative',
    color: color.base,
    backgroundColor: color.core.primary[3],
    border: `${ui.borderWidthThick}px solid ${color.core.primary[3]}`,
    borderRadius: ui.borderRadius,
    textAlign: 'center',

    '@selectors': {
      // Removes weird bonus padding from button in Firefox
      '::-moz-focus-inner': {
        border: 0,
        padding: 0,
        margin: 0,
      },

      // Only show hover states on non-disabled
      ':not([disabled]):hover': {
        backgroundColor: color.core.primary[4],
        borderColor: color.core.primary[4],
      },
    },
  },

  button_block: {
    display: 'block',
    width: '100%',
    whiteSpace: 'normal',
    overflow: 'hidden',
  },

  button_borderless: {
    borderColor: 'transparent',

    '@selectors': {
      ':not([disabled]):hover': {
        borderColor: color.accent.bgHover,
      },
    },
  },

  button_disabled: {
    ...pattern.disabled,
  },

  button_invalid: {},

  button_inverted: {
    color: color.core.primary[3],
    backgroundColor: color.accent.bg,

    '@selectors': {
      ':not([disabled]):hover': {
        color: color.core.primary[4],
        backgroundColor: color.accent.bgHover,
      },
    },
  },

  button_loading: {
    cursor: 'default',
  },

  button_small: {
    ...pattern.smallButton,
    minWidth: 6 * unit,
  },

  button_regular: {
    ...pattern.regularButton,
    minWidth: 8 * unit,
  },

  button_large: {
    ...pattern.largeButton,
    minWidth: 9 * unit,
  },
});

export default styleSheet;

export { styleSheet };
