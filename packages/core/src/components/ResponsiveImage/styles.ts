import { StyleSheet } from '../../hooks/useStyles';

const styleSheet: StyleSheet = ({ ui }) => ({
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

export default styleSheet;

export { styleSheet };
