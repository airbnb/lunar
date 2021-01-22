import { ComponentBlock } from 'aesthetic';
import { Z_INDEX_LIGHTBOX } from '../../constants';
import { StyleSheet } from '../../hooks/useStyles';
import { styleSheetSheet } from '../Sheet/styles';

export const styleSheetHeader: StyleSheet = ({ unit }) => ({
  header: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
  },

  pagination: {
    flexGrow: 1,
    flexShrink: 1,
    paddingLeft: unit,
  },

  infoButton: {
    flexGrow: 0,
    flexShrink: 0,
    paddingRight: unit,
    textAlign: 'right',
  },
});

export const styleSheetImage: StyleSheet = ({ color, unit }) => ({
  wrapper: {
    position: 'relative',
    height: '100%',
  },

  layout: {
    display: 'flex',
    position: 'absolute',
    top: -unit * 3,
    right: -unit,
    left: -unit,
    bottom: -unit,
  },

  figure: {
    background: color.accent.bgHover,
    flexGrow: 1,
    margin: 0,
  },

  aside: {
    width: 300,
    flexGrow: 0,
    flexShrink: 0,
    padding: unit * 3,
  },
});

export const styleSheetLightboxSheet: StyleSheet = (theme) => {
  const sheetStyle = styleSheetSheet(theme);

  // Override zIndex
  (sheetStyle.sheet as ComponentBlock).zIndex = Z_INDEX_LIGHTBOX;

  return sheetStyle;
};
