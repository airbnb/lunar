import { StyleSheet } from '../../hooks/useStyles';

export const styleSheetProfilePhotoGroup: StyleSheet = ({ color, font }) => ({
  group: {
    display: 'flex',
    alignItems: 'stretch',
  },

  cell: {
    borderRadius: '50%',
    border: `1px solid ${color.base}`,
    background: color.core.neutral[6],

    ':first-of-type': {
      marginLeft: 0,
    },

    ':empty': {
      display: 'none',
    },
  },

  remainder: {
    ...font.textRegular,
    position: 'relative',
  },

  remainderNumber: {
    transform: 'translate(-50%, -50%)',
    position: 'absolute',
    top: '50%',
    left: '50%',
    color: color.base,
  },
});
