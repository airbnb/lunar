import Core from '../..';
import { StyleSheet } from '../../hooks/useStyles';
import baseStyleSheet from '../Button/styles';

const styleSheet: StyleSheet = Core.aesthetic.extendStyles(baseStyleSheet, ({ color }) => ({
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

export default styleSheet;
