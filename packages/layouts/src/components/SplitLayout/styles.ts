import { StyleSheet } from '@airbnb/lunar/lib/hooks/useStyles';

const styleSheet: StyleSheet = () => ({
  wrapper: {
    display: 'flex',
    height: '100%',
  },

  column: {
    width: '50%',
  },
});

export default styleSheet;

export { styleSheet };
