import { StyleSheet } from '../../hooks/useStyles';

const styleSheet: StyleSheet = ({ unit }) => ({
  appLoader: {
    padding: unit * 10,
  },

  appLoader_centered: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },

  subtitle: {
    marginTop: unit,
  },

  errorOrLoader: {
    marginTop: unit * 1.5,
    maxWidth: '65%',
  },
});

export default styleSheet;

export { styleSheet };
