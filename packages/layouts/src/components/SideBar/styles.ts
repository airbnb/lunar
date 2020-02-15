import { StyleSheet } from '@airbnb/lunar/lib/hooks/useStyles';

export const styleSheetSideBar: StyleSheet = ({ unit, color }) => ({
  bar: {
    width: unit * 8,
    height: '100%',
    background: color.core.neutral[5],
  },

  list: {
    display: 'flex',
    flexDirection: 'column',
    margin: 0,
    padding: 0,

    '@selectors': {
      '> li': {
        listStyle: 'none',
        margin: 0,
      },
    },
  },
});

export const styleSheetItem: StyleSheet = ({ unit, color, pattern, transition }) => ({
  item: {
    ...pattern.resetButton,
    ...transition.box,
    paddingTop: unit * 1.5,
    paddingBottom: unit * 1.5,
    border: 0,
    display: 'block',
    textAlign: 'center',
    width: '100%',
    color: color.accent.bg,
    background: color.core.neutral[5],

    ':hover': {
      color: color.accent.bgHover,
      background: color.core.neutral[6],
    },
  },

  item_active: {
    background: color.core.neutral[6],
  },

  icon: {
    display: 'block',

    '@selectors': {
      '> svg': {
        display: 'inline-block',
        margin: 'auto',
      },
    },
  },

  label: {
    display: 'block',
    paddingTop: unit * 0.25,
  },
});
