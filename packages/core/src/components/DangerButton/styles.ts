import Core from '../..';
import { StyleSheet } from '../../hooks/useStyles';
import baseStyleSheet from '../Button/styles';

const styleSheet: StyleSheet = Core.aesthetic.extendStyles(baseStyleSheet, ({ color }) => ({
  button: {
    backgroundColor: color.core.danger[5],
    border: `2px solid ${color.core.danger[5]}`,

    '@selectors': {
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
      ':not([disabled]):hover': {
        color: color.core.danger[6],
        backgroundColor: color.accent.bgHover,
      },
    },
  },
}));

export default styleSheet;
