import { StyleSheet } from '../../hooks/useStyles';

const styleSheet: StyleSheet = ({ unit }) => ({
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

export default styleSheet;

export { styleSheet };
