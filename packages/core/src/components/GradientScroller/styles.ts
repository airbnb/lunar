import { StyleBlock } from 'aesthetic';
import { StyleSheet } from '../../hooks/useStyles';

export const styleSheetGradientScroller: StyleSheet = ({
  color,
  unit,
  ui,
  pattern,
  transition,
}) => {
  const scrollbarHeight = unit * 1.5;

  const gradient: StyleBlock = {
    ...transition.fade,
    position: 'absolute',
    top: 0,
    bottom: 0,
    zIndex: 1,
    content: "''",
    opacity: 0,
    pointerEvents: 'none',
  };

  const arrow: StyleBlock = {
    ...pattern.resetButton,
    position: 'absolute',
    top: '45%',
    marginTop: -scrollbarHeight / 2,
    transform: 'translateY(-50%)',
    backgroundColor: color.accent.bg,
    borderRadius: '50%',
    boxShadow: ui.boxShadow,
    padding: unit,
    outline: 'none',

    ':hover': {
      backgroundColor: color.accent.bgHover,
    },
  };

  return {
    container: {
      width: '100%',
      position: 'relative',
      margin: -unit / 2,
    },

    leftGradient: {
      ...gradient,
      width: unit * 5,
      left: 0,
      background: `linear-gradient(to right, ${color.accent.bg} 40%, transparent 100%)`,
    },

    leftArrow: {
      ...arrow,
      left: -unit,
    },

    rightGradient: {
      ...gradient,
      width: unit * 5,
      right: 0,
      background: `linear-gradient(to left, ${color.accent.bg} 40%, transparent 100%)`,
    },

    rightArrow: {
      ...arrow,
      right: -unit,
    },

    arrow_hideScrollbar: {
      top: '45%',
      marginTop: 0,
    },

    gradient_reveal: {
      opacity: 1,
      pointerEvents: 'auto',
    },

    scroller: {
      overflowX: 'auto',
      overflowY: 'hidden',
      display: 'flex',
      alignItems: 'center',
      alignContent: 'stretch',
      paddingBottom: scrollbarHeight,
      '-webkit-overflow-scrolling': 'touch',
    },

    scroller_hideScrollbar: {
      paddingBottom: 0,

      '::-webkit-scrollbar': {
        display: 'none',
      },
    },

    scrollTrigger: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },

    contents: {
      flexBasis: '100%',
      padding: unit / 2,
    },
  };
};
