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

  container_secondary: {
    borderWidth: 0,
  },
});

export const styleSheetItem: StyleSheet = ({ color, pattern, ui, unit }) => ({
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

  body_secondary: {
    borderTop: `1px solid ${color.core.neutral[1]}`,
    paddingLeft: `${unit * 3}px`,
    paddingRight: `${unit * 3}px`,
  },

  item_bordered: {
    borderTop: ui.border,
  },

  item_secondary: {
    backgroundColor: color.core.neutral[0],
    borderWidth: 0,
    marginBottom: unit * 2,
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

  title_secondary: {
    paddingLeft: `${unit * 3}px`,
    paddingRight: `${unit * 3}px`,
  },

  titleText: {
    flex: '1',
  },
});
