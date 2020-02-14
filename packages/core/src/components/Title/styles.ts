import { StyleSheet } from '../../hooks/useStyles';

export const styleSheetTitle: StyleSheet = ({ color, font }) => ({
  title: {
    ...font.textReset,
    color: color.accent.text,
  },

  title_inline: {
    display: 'inline',
  },

  title_level1: {
    ...font.title1,
  },

  title_level2: {
    ...font.title2,
  },

  title_level3: {
    ...font.title3,
  },

  title_inverted: {
    color: color.base,
  },

  title_muted: {
    color: color.muted,
  },

  title_primary: {
    color: color.core.primary[3],
  },

  title_center: {
    textAlign: 'center',
  },

  title_right: {
    textAlign: 'right',
  },
});
