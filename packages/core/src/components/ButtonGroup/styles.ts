import { StyleSheet } from '../../hooks/useStyles';

export const styleSheetButtonGroup: StyleSheet = ({ unit }) => ({
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

  cell_stacked: {
    marginRight: 0,
    marginBottom: unit,

    ':last-of-type': {
      marginBottom: 0,
    },
  },

  cell_stretched: {
    flex: 1,

    '@selectors': {
      '> *': {
        width: '100%',
      },
    },
  },
});
