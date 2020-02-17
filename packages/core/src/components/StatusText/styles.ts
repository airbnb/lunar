import { StyleSheet } from '../../hooks/useStyles';

export const styleSheetStatusText: StyleSheet = ({ color }) => ({
  text_danger: {
    color: color.core.danger[4],
  },

  text_info: {
    color: color.core.primary[4],
  },

  text_muted: {
    color: color.muted,
  },

  text_notice: {
    color: color.core.secondary[4],
  },

  text_success: {
    color: color.core.success[4],
  },

  text_warning: {
    color: color.core.warning[5],
  },
});
