import { StyleSheet } from '../../hooks/useStyles';

export const styleSheetItem: StyleSheet = ({ color, ui, unit }) => {
  const maxDotWidth = unit;
  const maxDotHeight = unit * 2.25;

  return {
    wrapper: {
      display: 'grid',
      gridColumnGap: unit * 2,
      gridTemplateAreas: '"bar content"',
      gridTemplateColumns: `${maxDotWidth}px 1fr`,
      gridTemplateRows: `minmax(${maxDotHeight}px, 1fr)`,
      justifyContent: 'flex-start',
    },

    barWrapper: {
      gridArea: 'bar',
    },

    bar: {
      background: color.accent.border,
      width: ui.borderWidthThick,
      height: `calc(100% - ${maxDotHeight}px)`,
      margin: 'auto',
    },

    content: {
      gridArea: 'content',
      paddingBottom: unit * 7,
    },

    content_secondary: {
      paddingBottom: unit * 2.75,
    },

    content_oldest: {
      paddingBottom: 0,
    },

    iconWrapper: {
      width: maxDotWidth,
      height: maxDotHeight,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  };
};

export default styleSheetItem;
