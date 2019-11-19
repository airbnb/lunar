import { StyleSheet } from '@airbnb/lunar/lib/hooks/useStyles';

const styleSheet: StyleSheet = ({ breakpoints, color, unit }) => ({
  layout: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
  },

  main: {
    flexGrow: 1,
    padding: `${unit * 2}px ${unit * 3}px`,
    background: color.accent.bgHover,
  },

  main_noBackground: {
    background: 'transparent',
  },

  main_noPadding: {
    padding: 0,
  },

  mainContent: {
    maxWidth: breakpoints.medium,
  },
});

export default styleSheet;

export { styleSheet };
