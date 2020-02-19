import { StyleSheet } from '../../hooks/useStyles';

export const styleSheetItem: StyleSheet = ({ color, ui, unit }) => ({
  wrapper: {
    marginLeft: unit * 0.5 - 1,
    borderLeft: ui.borderThick,
    paddingLeft: unit * 2.5,
    paddingBottom: unit * 7,
  },

  wrapper_secondary: {
    paddingBottom: 0,
    height: unit * 2.75,
  },

  wrapper_oldest: {
    paddingLeft: unit * 3,
  },

  iconWrapper_secondary: {
    marginLeft: unit * 0.25,
    marginRight: unit * 0.25,
  },
});
