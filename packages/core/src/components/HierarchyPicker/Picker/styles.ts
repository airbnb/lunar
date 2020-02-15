import { StyleSheet } from '../../../hooks/useStyles';

const styleSheet: StyleSheet = ({ ui, unit, color }) => ({
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

export default styleSheet;

export { styleSheet };
