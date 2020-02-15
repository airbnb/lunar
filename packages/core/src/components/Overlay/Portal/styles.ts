import { StyleSheet } from '../../../hooks/useStyles';
import { Z_INDEX_PORTAL } from '../../../constants';

const styleSheet: StyleSheet = ({ color }) => ({
  container: {
    position: 'fixed',
    zIndex: Z_INDEX_PORTAL,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: 'auto',
    userSelect: 'none',
  },

  noBg: {
    pointerEvents: 'none',
    overflow: 'hidden',
  },

  opaque: {
    backgroundColor: color.accent.blackout,
  },

  content: {
    width: 0,
    overflow: 'visible',
  },
});

export default styleSheet;

export { styleSheet };
