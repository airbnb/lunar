import { StyleSheet } from '../../hooks/useStyles';

const styleSheet: StyleSheet = ({ ui }) => ({
  container: {
    border: ui.border,
    cursor: 'move',
    overflow: 'hidden',
  },

  container_borderless: {
    borderColor: 'transparent',
  },

  image: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styleSheet;

export { styleSheet };
