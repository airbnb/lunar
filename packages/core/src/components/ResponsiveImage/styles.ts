import { StyleSheet } from '../../hooks/useStyles';

export const styleSheetImage: StyleSheet = ({ ui }) => ({
  image: {
    display: 'block',
    boxShadow: ui.boxShadow,
  },

  image_noShadow: {
    boxShadow: 'none',
  },

  image_cover: {
    objectFit: 'cover',
  },

  image_contain: {
    objectFit: 'contain',
  },
});
