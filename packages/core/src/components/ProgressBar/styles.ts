import { StyleSheet } from '../../hooks/useStyles';

const styleSheet: StyleSheet = ({ color, ui, unit }) => ({
  wrapper: {
    paddingTop: unit / 4,
    paddingBottom: unit / 4,
  },

  bar: {
    height: unit / 2,
    background: color.core.primary[1],
  },

  bar_leading: {
    borderTopRightRadius: ui.borderRadius,
    borderBottomRightRadius: ui.borderRadius,
  },

  bar_trailing: {
    borderTopLeftRadius: ui.borderRadius,
    borderBottomLeftRadius: ui.borderRadius,
  },

  progress: {
    background: color.core.primary[6],
  },
});

export default styleSheet;

export { styleSheet };
