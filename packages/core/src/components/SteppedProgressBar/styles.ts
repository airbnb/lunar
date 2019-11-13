import { StyleSheet } from '../../hooks/useStyles';

export const styleSheet: StyleSheet = () => ({
  bar: {
    display: 'flex',
  },
});

export const styleSheetStep: StyleSheet = () => ({
  step: {
    flexGrow: 1,
    marginRight: 2,

    ':last-child': {
      marginRight: 0,
    },

    '@selectors': {
      // Fix tooltips mixed with flexbox
      '> *': {
        display: 'block',
        width: '100%',
      },
    },
  },
});
