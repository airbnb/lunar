import { StyleSheet } from '../../hooks/useStyles';

const styleSheet: StyleSheet = ({ color, ui, unit }) => ({
  container: {
    marginTop: unit * 1.5,
    padding: unit * 2,
    backgroundColor: color.core.neutral[6],
    boxShadow: ui.boxShadowLarge,
    willChange: 'transform, opacity',
    transform: 'translateY(-100%)',
    transition: 'transform .3s, opacity .3s',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    opacity: 0,
    lineHeight: 1,
    borderRadius: ui.borderRadius,
  },

  container_visible: {
    transform: 'translateY(0)',
    opacity: 1,
  },

  container_success: {
    backgroundColor: color.core.success[3],
  },

  container_danger: {
    backgroundColor: color.core.danger[3],
  },

  right: {
    textAlign: 'right',
    margin: -unit,
    marginLeft: unit,
  },
});

export default styleSheet;

export { styleSheet };
