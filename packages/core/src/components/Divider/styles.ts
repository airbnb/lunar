import { StyleSheet } from '../../hooks/useStyles';

export const styleSheetDivider: StyleSheet = ({ ui, unit }) => ({
  divider: {
    borderBottom: ui.border,
  },

  divider_short: {
    width: 4 * unit,
  },
});
