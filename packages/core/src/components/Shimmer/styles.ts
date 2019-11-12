import { StyleSheet } from '../../hooks/useStyles';

const styleSheet: StyleSheet = () => ({
  shimmer: {
    animationDirection: 'alternate',
    animationDuration: '1s',
    animationFillMode: 'forwards',
    animationIterationCount: 'infinite',
    animationName: {
      name: 'shimmer',
      from: { opacity: 0.1 },
      to: { opacity: 0.3 },
    },
    animationTimingFunction: 'ease-in-out',
    backgroundColor: 'currentColor',
    display: 'inline-block',
    position: 'relative',
    verticalAlign: 'middle',
  },

  shimmer_block: {
    display: 'block',
  },
});

export default styleSheet;

export { styleSheet };
