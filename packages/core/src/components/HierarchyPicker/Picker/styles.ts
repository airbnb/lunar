import { StyleSheet } from '../../../hooks/useStyles';

export const styleSheetPicker: StyleSheet = ({ ui, unit, color }) => ({
  pane: {
    display: 'inline-block',
    borderRadius: ui.borderRadius,
    backgroundColor: color.accent.bg,
    boxShadow: ui.boxShadowMedium,
    marginBottom: unit,
  },

  hierarchy: {
    display: 'flex',
    flexDirection: 'row',
  },
});
