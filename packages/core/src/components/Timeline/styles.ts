import { StyleSheet } from '../../hooks/useStyles';

export const styleSheetItem: StyleSheet = ({ color, unit }) => ({
  wrapper: {
    marginLeft: unit * 0.5 - 1,
    borderLeft: `2px solid ${color.core.neutral[3]}`,
    paddingLeft: unit * 2.5,
    paddingBottom: unit * 7,
  },

  wrapper_oldest: {
    paddingLeft: unit * 3,
  },
});

export const styleSheetSimpleItem: StyleSheet = ({ color, unit }) => ({
  wrapper: {
    marginLeft: unit * 0.5 - 1,
    borderLeft: `2px solid ${color.core.neutral[3]}`,
    paddingLeft: unit * 2.5,
    height: unit * 2.75,
  },

  iconWrapper: {
    marginLeft: unit * 0.25,
    marginRight: unit * 0.25,
  },
});
