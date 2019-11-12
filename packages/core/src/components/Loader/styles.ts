import { StyleSheet } from '../../hooks/useStyles';

const styleSheet: StyleSheet = ({ color, unit }) => ({
  loader: {
    margin: '0 auto',
    textAlign: 'center',
  },

  loader_absolute: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translateX(-50%) translateY(-50%)',
  },

  loader_inline: {
    display: 'inline-block',
  },

  dot: {
    width: 6,
    height: 6,
    marginRight: unit / 2,
    borderRadius: '100%',
    display: 'inline-block',
    animationName: {
      name: 'fade',
      '0%, 80%, 100%': {
        opacity: 0,
      },
      '30%, 50%': {
        opacity: 1,
      },
    },
    animationDuration: '0.8s',
    animationIterationCount: 'infinite',
    animationTimingFunction: 'linear',
    animationFillMode: 'both',
    verticalAlign: 'middle',
    backgroundColor: color.core.primary[3],
  },

  dot_inverted: {
    backgroundColor: color.accent.bg,
  },

  dot_large: {
    width: 12,
    height: 12,
    marginRight: unit,
  },

  dot_1: {
    animationDelay: '-0.3s',
  },

  dot_2: {
    animationDelay: '-0.15s',
  },
});

export default styleSheet;

export { styleSheet };
