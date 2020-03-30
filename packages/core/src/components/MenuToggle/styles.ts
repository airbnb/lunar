import { StyleSheet } from '../../hooks/useStyles';

export const styleSheetMenuToggle: StyleSheet = ({ pattern, unit, transition }) => ({
  container: {
    display: 'inline-block',
    position: 'relative',
  },

  dropdown: {
    ...transition.fade,
    visibility: 'visible',
    position: 'relative',
  },

  dropdown_hidden: {
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

  customToggle: {
    ...pattern.resetButton,
  },
});
