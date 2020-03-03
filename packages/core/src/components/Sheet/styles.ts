import { StyleSheet } from '../../hooks/useStyles';
import toRGBA from '../../utils/toRGBA';
import { Z_INDEX_PORTAL } from '../../constants';

export const styleSheetSheet: StyleSheet = ({ color, pattern, ui, unit }) => ({
  sheet: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    boxShadow: ui.boxShadowLarge,
    zIndex: Z_INDEX_PORTAL,

    '@selectors': {
      '> div': {
        height: '100%',
      },
    },
  },

  sheet_portal: {
    position: 'fixed',
  },

  sheet_animating: {
    pointerEvents: 'none',
    animationDuration: '300ms',
  },

  sheet_out: {
    animationFillMode: 'forwards',
    animationName: {
      name: 'sheetSlideOut',
      from: {
        opacity: 1,
        transform: 'translateY(0%)',
      },
      to: {
        opacity: 0,
        transform: 'translateY(80%)',
      },
    },
    animationTimingFunction: 'ease-in',
  },

  sheet_in: {
    animationFillMode: 'forwards',
    animationName: {
      name: 'sheetSlideIn',
      from: {
        opacity: 0,
        transform: 'translateY(80%)',
      },
      to: {
        opacity: 1,
        transform: 'translateY(0%)',
      },
    },
    animationTimingFunction: 'ease-out',
  },

  sheet_slide_out: {
    animationFillMode: 'forwards',
    animationName: {
      name: 'sheetSlideOut',
      from: {
        opacity: 1,
        transform: 'translateX(0%)',
      },
      to: {
        opacity: 0,
        transform: 'translateX(80%)',
      },
    },
    animationTimingFunction: 'ease-in',
  },

  sheet_slide_in: {
    animationFillMode: 'forwards',
    animationName: {
      name: 'sheetSlideIn',
      from: {
        opacity: 0,
        transform: 'translateX(80%)',
      },
      to: {
        opacity: 1,
        transform: 'translateX(0%)',
      },
    },
    animationTimingFunction: 'ease-out',
  },

  container: {
    height: '100%',
    width: '100%',
    overflow: 'hidden',
  },

  container_gap: {
    backgroundColor: toRGBA(color.core.neutral[6], 30),
    display: 'grid',
    gridTemplateAreas: '"moverlay mcontent mcontent mcontent"',
    gridTemplateColumns: '1fr 1fr 1fr 1fr',
    gap: 0,
    gridGap: 0,
    justifyItems: 'stretch',
    alignItems: 'stretch',
  },

  gap: {
    ...pattern.resetButton,
    gridArea: 'moverlay',
    overflow: 'hidden',
    outline: 'none',

    '@selectors': {
      '::-moz-focus-inner': {
        border: 0,
      },
    },
  },

  wrapper: {
    gridArea: 'mcontent',
    background: color.accent.bg,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    overflow: 'auto',
  },

  wrapper_gap: {
    height: 'auto',
  },

  content: {
    marginTop: 2 * unit,
    padding: 4 * unit,
    paddingTop: 0,
    flex: 1,
  },

  content_compact: {
    padding: unit,
  },

  headerShadow: {
    borderBottom: ui.border,
  },
});

export const styleSheetSheetArea: StyleSheet = () => ({
  sheet_visible: {
    position: 'relative',
    overflow: 'hidden',
  },
});
