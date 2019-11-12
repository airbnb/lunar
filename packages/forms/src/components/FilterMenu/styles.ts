import { StyleSheet } from '@airbnb/lunar/lib/hooks/useStyles';

const styleSheet: StyleSheet = ({ unit, transition }) => ({
  controls: {
    display: 'flex',
    justifyContent: 'space-between',
  },
});

export default styleSheet;

export { styleSheet };
