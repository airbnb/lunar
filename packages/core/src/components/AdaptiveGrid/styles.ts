import { StyleSheet } from '../../hooks/useStyles';

// eslint-disable-next-line
export const styleSheetGrid: StyleSheet = ({ unit }) => ({
  container: {
    display: 'grid',
    gridGap: unit * 2,
  },

  container_noGutter: {
    gridGap: 0,
  },

  item: {
    ':empty': {
      display: 'none',
    },
  },
});
