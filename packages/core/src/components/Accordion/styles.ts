import { StyleSheet } from '../../hooks/useStyles';

export const styleSheet: StyleSheet = ({ color }) => ({
  container: {
    borderBottom: '1px solid transparent',
    borderTop: '1px solid transparent',

    ':empty': {
      display: 'none',
    },
  },

  container_bordered: {
    borderBottomColor: color.accent.border,
  },
});

export const styleSheetItem: StyleSheet = ({ pattern, ui, unit }) => ({
  body: {
    display: 'none',
    padding: `${unit}px ${unit * 2}px ${unit * 2}px`,
  },

  body_noSpacing: {
    padding: `0 0 ${unit * 2}px`,
  },

  body_expanded: {
    display: 'block',
  },

  item_bordered: {
    borderTop: ui.border,
  },

  title: {
    ...pattern.resetButton,
    display: 'flex',
    alignItems: 'center',
    padding: unit * 2,
    textAlign: 'left',
    width: '100%',
  },

  title_noSpacing: {
    paddingLeft: 0,
    paddingRight: 0,
  },

  titleText: {
    flex: '1',
  },
});
