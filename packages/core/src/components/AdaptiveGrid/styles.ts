import { StyleSheet } from '../../hooks/useStyles';

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
