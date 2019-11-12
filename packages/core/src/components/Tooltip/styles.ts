import { StyleSheet } from '../../hooks/useStyles';

const styleSheet: StyleSheet = ({ unit, color, pattern, ui }) => ({
  container: {
    display: 'inline-block',
  },

  offscreen: {
    ...pattern.offscreen,
  },

  underlined: {
    borderBottom: `1px dotted ${color.core.primary[3]}`,
    cursor: 'help',
  },

  tooltip: {
    animationDuration: '200ms',
    animationTimingFunction: 'ease-out',
  },

  tooltip_above: {
    animationName: {
      name: 'fadeDown',
      from: {
        opacity: 0,
        transform: `translateY(${unit * 1.5}px)`,
      },
      to: {
        opacity: 1,
      },
    },
  },

  tooltip_below: {
    animationName: {
      name: 'fadeUp',
      from: {
        opacity: 0,
        transform: `translateY(-${unit * 1.5}px)`,
      },
      to: {
        opacity: 1,
      },
    },
  },

  shadow: {
    display: 'inline-block',
    boxShadow: ui.boxShadowLarge,
    borderRadius: ui.borderRadius,
  },
});

export default styleSheet;

export { styleSheet };
