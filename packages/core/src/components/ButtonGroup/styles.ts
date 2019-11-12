import { StyleSheet } from '../../hooks/useStyles';

const styleSheet: StyleSheet = ({ unit }) => ({
  buttonGroup: {
    display: 'flex',
    alignItems: 'center',
  },

  buttonGroup_stacked: {
    flexDirection: 'column',
    alignItems: 'stretch',
  },

  cell: {
    marginRight: unit,

    ':last-of-type': {
      marginRight: 0,
    },

    ':empty': {
      display: 'none',
    },
  },

  cell_stacked: {
    marginBottom: unit,

    ':last-of-type': {
      marginBottom: 0,
    },
  },
});

export default styleSheet;

export { styleSheet };
