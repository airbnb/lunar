import { StyleSheet } from '../../hooks/useStyles';

export const linkStyleSheet: StyleSheet = ({ color, pattern, transition }) => ({
  link: {
    ...pattern.resetButton,
    ...transition.box,
    color: color.core.primary[3],
    textAlign: 'left',
    verticalAlign: 'baseline',

    ':hover': {
      color: color.core.primary[4],
      textDecoration: 'underline',
    },

    ':focus': {
      color: color.core.primary[4],
      boxShadow: 'none',
      textDecoration: 'underline',
    },
  },

  link_block: {
    display: 'block',
    width: '100%',
  },

  link_baseline: {
    display: 'inline',
  },

  link_inverted: {
    color: color.accent.bg,

    ':hover': {
      color: color.accent.bgHover,
    },

    ':focus': {
      color: color.accent.bgHover,
    },
  },

  link_muted: {
    color: color.core.neutral[3],

    ':hover': {
      color: color.core.neutral[4],
    },

    ':focus': {
      color: color.core.neutral[4],
    },
  },

  link_disabled: {
    ...pattern.disabled,
    cursor: 'default',

    ':hover': {
      textDecoration: 'none',
    },

    ':focus': {
      textDecoration: 'none',
    },
  },
});
