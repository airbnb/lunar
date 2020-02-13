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

  bar_danger: {
    background: color.core.danger[1],
  },

  bar_muted: {
    background: color.core.neutral[2],
  },

  bar_notice: {
    background: color.core.secondary[1],
  },

  bar_success: {
    background: color.core.success[1],
  },

  bar_warning: {
    background: color.core.warning[1],
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
    background: color.core.primary[5],
  },

  progress_danger: {
    background: color.core.danger[5],
  },

  progress_muted: {
    background: color.core.neutral[5],
  },

  progress_notice: {
    background: color.core.secondary[5],
  },

  progress_success: {
    background: color.core.success[5],
  },

  progress_warning: {
    background: color.core.warning[5],
  },
});

export default styleSheet;

export { styleSheet };
