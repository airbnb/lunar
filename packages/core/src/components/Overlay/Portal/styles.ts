import { StyleSheet } from '../../../hooks/useStyles';
import { Z_INDEX_PORTAL } from '../../../constants';

export const styleSheetPortal: StyleSheet = ({ color }) => ({
  container: {
    position: 'fixed',
    zIndex: Z_INDEX_PORTAL,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: 'auto',
  },

  withPointerEvents: {
    pointerEvents: 'all',
  },

  noBg: {
    pointerEvents: 'none',
    overflow: 'hidden',
  },

  noUserSelect: {
    userSelect: 'none',
  },

  opaque: {
    backgroundColor: color.accent.blackout,
  },

  content: {
    width: 0,
    overflow: 'visible',
  },
});
