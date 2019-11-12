import { StyleSheet } from '@airbnb/lunar/lib/hooks/useStyles';

const styleSheet: StyleSheet = ({ unit, transition }) => ({
  container: {
    display: 'inline-block',
    position: 'relative',
  },

  form: {
    ...transition.fade,
    visibility: 'visible',
    position: 'relative',
  },

  form_hidden: {
    opacity: 0,
    visibility: 'hidden',
    userSelect: 'none',
  },

  menu: {
    marginTop: unit,
  },

  controls: {
    display: 'flex',
    justifyContent: 'space-between',
  },
});

export default styleSheet;

export { styleSheet };
