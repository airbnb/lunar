import { StyleSheet } from '../../hooks/useStyles';

export const linkStyleSheet: StyleSheet = ({ color, pattern, transition }) => ({
  link: {
    ...pattern.resetButton,
    ...transition.box,
    color: color.core.primary[3],
    textAlign: 'left',
    verticalAlign: 'baseline',

    ':active': {
      outline: 'none',
    },

    ':hover': {
      color: color.core.primary[4],
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
  },

  link_muted: {
    color: color.core.neutral[3],

    ':hover': {
      color: color.core.neutral[4],
    },
  },

  link_disabled: {
    ...pattern.disabled,

    ':hover': {
      textDecoration: 'none',
    },
  },
});
