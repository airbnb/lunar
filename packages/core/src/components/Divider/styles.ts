import { StyleSheet } from '../../hooks/useStyles';

const styleSheet: StyleSheet = ({ ui, unit }) => ({
  divider: {
    borderBottom: ui.border,
  },

  divider_short: {
    width: 4 * unit,
  },
});

export default styleSheet;

export { styleSheet };
