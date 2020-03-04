import { StyleSheet } from '../../hooks/useStyles';

export const styleSheetSortCarets: StyleSheet = ({ color, unit }) => ({
  container: {
    display: 'inline-block',
    verticalAlign: 'middle',
    marginTop: -1,
    width: unit * 1.5,
    height: unit,
  },

  container_full: {
    height: unit * 2,
  },

  caret: {
    display: 'block',
    position: 'relative',
    width: unit * 1.5,
    height: unit,
    overflow: 'hidden',
  },

  caret_up: {
    '@selectors': {
      '> svg': {
        margin: '-.4em',
        marginTop: '-.55em',
      },
    },
  },

  caret_down: {
    '@selectors': {
      '> svg': {
        margin: '-.4em',
        marginTop: '-.6em',
      },
    },
  },

  caret_inactive: {
    color: color.core.neutral[3],
  },

  caret_active: {
    color: color.core.neutral[4],
  },
});
