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

  buttonGroup_endAlign: {
    justifyContent: 'flex-end',
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

  cell_block: {
    flex: 1,
  },

  cell_stacked: {
    marginRight: 0,
    marginBottom: unit,

    ':last-of-type': {
      marginBottom: 0,
    },
  },
});

export default styleSheet;

export { styleSheet };
