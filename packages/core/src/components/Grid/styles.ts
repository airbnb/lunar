import { StyleBlock } from 'aesthetic';
import { StyleSheet } from '../../hooks/useStyles';

export const styleSheetGrid: StyleSheet = ({ unit }) => ({
  grid: {
    display: 'flex',
    flex: '0 1 auto',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'stretch',
    justifyContent: 'space-between',
    marginLeft: -unit,
    marginRight: -unit,
  },

  grid_reversed: {
    flexDirection: 'row-reverse',
  },

  grid_center: {
    justifyContent: 'center',
  },

  grid_start: {
    justifyContent: 'flex-start',
  },

  grid_end: {
    justifyContent: 'flex-end',
  },

  grid_top: {
    alignItems: 'flex-start',
  },

  grid_middle: {
    alignItems: 'center',
  },

  grid_bottom: {
    alignItems: 'flex-end',
  },
});

export const styleSheetCol: StyleSheet = ({ unit }) => {
  const spans: { [key: string]: StyleBlock } = {};
  const offsets: { [key: string]: StyleBlock } = {};

  Array.from({ length: 12 }, (v, k) => {
    const span = k + 1;
    const offset = k;
    const width = 100 / (12 / span);

    spans[`span${span}`] = {
      flexBasis: `${width}%`,
      maxWidth: `${width}%`,
    };

    offsets[`offset${offset}`] = {
      marginLeft: offset > 0 ? `${100 / (12 / offset)}%` : 0,
    };

    return span;
  });

  return {
    col: {
      flex: '0 0 auto',
      paddingLeft: unit,
      paddingRight: unit,
    },

    ...spans,
    ...offsets,
  };
};
