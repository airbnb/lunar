import { StyleSheet } from '../../hooks/useStyles';

const styleSheet: StyleSheet = ({ color, font, pattern }) => ({
  text: {
    ...font.textReset,
    ...font.textRegular,
    color: color.accent.text,
  },

  text_baseline: {
    display: 'inline',
  },

  text_inline: {
    display: 'inline-block',
  },

  text_preserveWhitespace: {
    whiteSpace: 'pre-wrap',
  },

  text_micro: {
    ...font.textMicro,
  },

  text_small: {
    ...font.textSmall,
  },

  text_large: {
    ...font.textLarge,
  },

  text_disabled: {
    ...pattern.disabled,
  },

  text_inverted: {
    color: color.base,
  },

  text_muted: {
    color: color.muted,
  },

  text_bold: {
    fontWeight: font.weights.semibold,
  },

  text_light: {
    fontWeight: font.weights.light,
  },

  text_truncated: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',

    '@selectors': {
      '> div': {
        display: 'inline',
      },
    },
  },

  text_uppercased: {
    textTransform: 'uppercase',
  },

  text_uppercased_micro: {
    letterSpacing: 1,
  },

  text_center: {
    textAlign: 'center',
  },

  text_end: {
    textAlign: 'right',
  },

  text_start: {
    textAlign: 'left',
  },

  text_noWrap: {
    whiteSpace: 'nowrap',
  },
});

export default styleSheet;

export { styleSheet };
