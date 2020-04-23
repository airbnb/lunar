import { StyleSheet } from '../../../hooks/useStyles';
import toRGBA from '../../../utils/toRGBA';

export const HANDLE_SIZE = 14;
export const HALF_HANDLE_SIZE = HANDLE_SIZE / 2;
export const TRACK_HEIGHT = 4;
export const MARK_SIZE = TRACK_HEIGHT;

export const stylesheetInputRange: StyleSheet = ({ unit, ui, color, font }) => ({
  container: {
    position: 'relative',
    height: 3 * unit,
  },

  input: {
    transform: 'translateY(-2px)',
    '-webkit-appearance': 'none',
    width: '100%',
    height: TRACK_HEIGHT,
    margin: 0,
    background: color.core.neutral[2],
    borderRadius: ui.borderRadius,
    outline: 'none',
    overflow: 'visible',
    cursor: 'pointer',

    '@selectors': {
      ':hover::-webkit-slider-thumb, :active::-webkit-slider-thumb, :focus::-webkit-slider-thumb': {
        boxShadow: `0 0 0 2px ${color.accent.borderActive}, 0 0 0 5px ${toRGBA(
          color.accent.borderActive,
          20,
        )}`,
      },

      '::-webkit-slider-thumb': {
        '-webkit-appearance': 'none',
        zIndex: 1,
        transition: `opacity ${ui.transitionTime}`,
        width: HANDLE_SIZE,
        height: HANDLE_SIZE,
        border: 'none',
        borderRadius: HANDLE_SIZE,
        background: color.base,
        boxShadow: `0 0 0 2px ${color.accent.borderActive}`,
      },
    },
  },

  annotation: {
    position: 'absolute',
    top: 1.25 * unit + 1, // align in track center
    width: TRACK_HEIGHT,
    height: TRACK_HEIGHT,
    borderRadius: TRACK_HEIGHT,
    background: color.core.neutral[3],
    pointerEvents: 'none',
  },

  annotation_bounds: {
    background: color.core.neutral[2],
  },

  annotation_bounds_active: {
    background: color.core.primary[3],
  },

  annotation_active: {
    background: color.core.primary[1],
  },

  annotation_hidden: {
    background: 'transparent',
  },

  annotationLabel: {
    position: 'absolute',
    ...font.textMicro,
    left: '50%',
    transform: `translate(-50%, ${HANDLE_SIZE}px)`,
  },

  tooltip: {
    position: 'absolute',
    pointerEvents: 'none',
    animationName: {
      name: 'fadeUp',
      from: {
        opacity: 0,
        transform: `translateY(-${unit * 1.5}px)`,
      },
      to: {
        opacity: 1,
        transform: `translateY(0px)`,
      },
    },
  },

  tooltipContent: {
    display: 'inline-block',
    paddingTop: 0.5 * unit,
    paddingRight: unit,
    paddingBottom: 0.5 * unit,
    paddingLeft: unit,
    backgroundColor: color.accent.blackout,
    boxShadow: ui.boxShadowMedium,
    borderRadius: ui.borderRadius,
    textAlign: 'initial',
    transform: `translate(-50%, ${0.5 * unit}px)`,
  },
});
