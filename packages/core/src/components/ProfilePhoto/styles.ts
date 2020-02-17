import { StyleSheet } from '../../hooks/useStyles';

export const styleSheetProfilePhoto: StyleSheet = ({ color }) => ({
  inline: {
    display: 'inline-block',
  },

  image: {
    display: 'block',
    background: color.core.neutral[6],
    color: color.base,
    objectFit: 'cover',
    overflow: 'hidden',
  },

  roundedImage: {
    borderRadius: '50%',
  },

  small: {
    height: 24,
    width: 24,
    maxHeight: 24,
    maxWidth: 24,
  },
  regular: {
    height: 48,
    width: 48,
    maxHeight: 48,
    maxWidth: 48,
  },

  large: {
    height: 96,
    width: 96,
    maxHeight: 96,
    maxWidth: 96,
  },

  macro: {
    height: 160,
    width: 160,
    maxHeight: 160,
    maxWidth: 160,
  },
});
