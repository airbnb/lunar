import { StyleSheet } from '../../hooks/useStyles';

export const styleSheetTooltip: StyleSheet = ({ unit, color, pattern, ui }) => ({
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

  content: {
    display: 'inline-block',
    padding: unit * 1.5,
    backgroundColor: color.accent.bg,
    boxShadow: ui.boxShadowMedium,
    borderRadius: ui.borderRadius,
    textAlign: 'initial',
  },

  content_inverted: {
    color: color.base,
    backgroundColor: color.baseInverse,
  },

  popover: {
    position: 'absolute',
    zIndex: 1,
  },
});
