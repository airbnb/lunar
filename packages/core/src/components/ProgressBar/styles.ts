import { StyleSheet } from '../../hooks/useStyles';

export const styleSheetProgressBar: StyleSheet = ({ color, ui, unit }) => ({
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
    background: color.core.primary[6],
  },

  progress_danger: {
    background: color.core.danger[6],
  },

  progress_muted: {
    background: color.core.neutral[6],
  },

  progress_notice: {
    background: color.core.secondary[6],
  },

  progress_success: {
    background: color.core.success[6],
  },

  progress_warning: {
    background: color.core.warning[6],
  },
});
