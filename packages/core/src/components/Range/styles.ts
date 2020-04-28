import { StyleSheet } from '../../hooks/useStyles';

export const HANDLE_SIZE = 18;
export const HALF_HANDLE_SIZE = HANDLE_SIZE / 2;
export const TRACK_HEIGHT = 4;
export const ANNOTATION_SIZE = TRACK_HEIGHT;

export const stylesheetInputRange: StyleSheet = ({ unit, ui, color, font, pattern }) => {
  const CONTAINER_HEIGHT = 3 * unit;

  return {
    container: {
      position: 'relative',
      height: CONTAINER_HEIGHT,
    },

    container_disabled: {
      opacity: 0.4,
    },

    input: {
      transform: 'translateY(-2px)', // center-align
      appearance: 'none',
      width: '100%',
      height: TRACK_HEIGHT,
      margin: 0,
      background: color.core.neutral[2],
      outline: 'none',
      overflow: 'visible',
      cursor: 'pointer',

      '@selectors': {
        '::-webkit-slider-thumb': {
          appearance: 'none',
          zIndex: 1,
          transition: `opacity ${ui.transitionTime}, backgroundColor ${ui.transitionTime}`,
          width: HANDLE_SIZE,
          height: HANDLE_SIZE,
          border: `2px solid ${color.core.primary[3]}`,
          borderRadius: HANDLE_SIZE,
          backgroundColor: color.accent.bg,
        },

        ':not([disabled]):active::-webkit-slider-thumb, :not([disabled]):focus::-webkit-slider-thumb': {
          ...pattern.themedFocus,
          backgroundColor: color.accent.bgHover,
          borderColor: color.core.primary[4],
        },

        ':not([disabled]):hover::-webkit-slider-thumb': {
          backgroundColor: color.accent.bgHover,
          borderColor: color.core.primary[4],
        },
      },
    },

    annotation: {
      position: 'absolute',
      top: CONTAINER_HEIGHT / 2 - 1,
      width: ANNOTATION_SIZE,
      height: ANNOTATION_SIZE,
      borderRadius: ANNOTATION_SIZE,
      backgroundColor: color.core.neutral[3],
      pointerEvents: 'none',
    },

    annotation_bounds: {
      backgroundColor: color.core.neutral[2],
    },

    annotation_bounds_active: {
      backgroundColor: color.core.primary[3],
    },

    annotation_active: {
      backgroundColor: color.core.primary[1],
    },

    annotation_hidden: {
      backgroundColor: 'transparent',
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
    },

    tooltipContent: {
      display: 'inline-block',
      paddingTop: 0.5 * unit,
      paddingRight: unit,
      paddingBottom: 0.5 * unit,
      paddingLeft: unit,
      backgroundColor: color.accent.bg,
      boxShadow: ui.boxShadowMedium,
      borderRadius: ui.borderRadius,
      textAlign: 'initial',
      transform: `translate(-50%, ${0.5 * unit}px)`,
    },

    tooltipContent_inverted: {
      backgroundColor: color.accent.blackout,
    },
  };
};
