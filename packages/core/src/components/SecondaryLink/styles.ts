import Core from '../..';
import { StyleSheet } from '../../hooks/useStyles';
import baseStyleSheet from '../Link/styles';

const styleSheet: StyleSheet = Core.aesthetic.extendStyles(baseStyleSheet, ({ color }) => ({
  link: {
    color: color.core.neutral[5],

    ':hover': {
      color: color.core.neutral[6],
    },
  },
}));

export default styleSheet;
