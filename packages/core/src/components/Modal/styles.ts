import { StyleSheet } from '../../hooks/useStyles';
import { Z_INDEX_MODAL } from '../../constants';
import toRGBA from '../../utils/toRGBA';

export const MODAL_MAX_WIDTH_SMALL = 400;
export const MODAL_MAX_WIDTH_MEDIUM = 600;
export const MODAL_MAX_WIDTH_LARGE = 800;

export const styleSheetModal: StyleSheet = ({ unit, color }) => ({
  container: {
    bottom: 0,
    left: 0,
    overflowY: 'auto',
    position: 'fixed',
    right: 0,
    top: 0,
    zIndex: Z_INDEX_MODAL,
  },

  wrapper: {
    alignItems: 'center',
    backgroundColor: color.accent.blackout,
    display: 'flex',
    justifyContent: 'center',
    minHeight: '100%',
    padding: unit * 2,
    width: '100%',
  },
});

export const styleSheetImageLayout: StyleSheet = ({ responsive, ui, unit }) => ({
  splitContent: {
    display: 'flex',
  },

  splitContentPane: {
    flex: '1',
  },

  splitContentImagePane: {
    borderLeft: ui.border,
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    overflow: 'hidden',
    position: 'relative',

    '@media': {
      [responsive.xsmall]: {
        display: 'none',
      },
    },
  },

  image: {
    display: 'block',
    objectFit: 'contain',
    maxWidth: '100%',
    maxHeight: '100%',
    margin: unit * 3,
  },

  imageCover: {
    objectFit: 'cover',
    height: '100%',
    width: '100%',
    margin: 0,
  },
});

export const styleSheetInner: StyleSheet = ({ color, responsive, ui, unit }) => ({
  content: {
    backgroundColor: color.accent.bg,
    borderRadius: ui.borderRadius,
    boxShadow: ui.boxShadowLarge,
    maxWidth: MODAL_MAX_WIDTH_MEDIUM,
    position: 'relative',
    width: '100%',

    ':focus': {
      outline: 'none',
    },
  },

  content_small: {
    maxWidth: MODAL_MAX_WIDTH_SMALL,
  },

  content_large: {
    maxWidth: MODAL_MAX_WIDTH_LARGE,
  },

  content_fluid: {
    maxWidth: '70%',

    '@media': {
      [responsive.small]: {
        maxWidth: '85%',
      },
    },
  },
});

export const styleSheetInnerContent: StyleSheet = ({ color, ui, unit }) => ({
  wrapper: {
    position: 'relative',
  },

  header: {
    padding: `${unit * 3}px ${unit * 4}px ${unit * 3}px ${unit * 3}px`,
  },

  header_scrollable: {
    position: 'relative',

    ':after': {
      content: '" "',
      position: 'absolute',
      top: '100%',
      left: 0,
      right: 0,
      height: unit / 2,
      background: `linear-gradient(${toRGBA(color.core.neutral[6], 15)}, ${toRGBA(
        color.core.neutral[6],
        0,
      )})`,
    },
  },

  close: {
    position: 'absolute',
    top: unit * 2,
    right: unit * 2,
    zIndex: Z_INDEX_MODAL,
  },

  close_float: {
    float: 'right',
    position: 'relative',
    top: 0,
    right: 0,
    margin: `${unit * 2}px ${unit * 2}px ${unit / 2}px ${unit / 2}px`,
  },

  body: {
    padding: `0 ${unit * 3}px`,
  },

  body_paddingBottom: {
    paddingBottom: unit * 3,
  },

  body_paddingTop: {
    paddingTop: unit * 3,
  },

  body_scrollable: {
    paddingBottom: unit * 3,
    maxHeight: 300,
    overflow: 'auto',

    ':before': {
      content: '" "',
      position: 'sticky',
      display: 'block',
      width: `calc(100% + ${unit * 6}px)`,
      marginLeft: -unit * 3,
      height: unit / 2,
      background: color.accent.bg,
    },
  },

  body_scrollableSmall: {
    maxHeight: 160,
  },

  body_scrollableLarge: {
    maxHeight: 500,
  },

  footer: {
    padding: unit * 3,
  },

  footer_scrollable: {
    borderTop: ui.border,
  },
});
