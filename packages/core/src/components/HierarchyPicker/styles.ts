import { StyleSheet } from '../../hooks/useStyles';
import inputStyleSheet from '../../themes/inputStyleSheet';

const styleSheet: StyleSheet = theme => ({
  ...inputStyleSheet(theme),

  selectlike: {
    position: 'relative',
  },

  selectlike_enabled: {
    cursor: 'pointer',
  },

  arrow: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    overflow: 'hidden',
    width: theme.unit * 5,
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styleSheet;

export { styleSheet };
