import { StyleSheet } from '../../../hooks/useStyles';

export const ICON_SIZE = 18;

export const styleSheetItem: StyleSheet = ({ color, unit, ui }) => ({
  item: {
    display: 'flex',
    alignItems: 'center',
    padding: `${unit}px ${1.5 * unit}px ${unit}px ${2.75 * unit}px`,
    cursor: 'pointer',
    position: 'relative',
    borderRadius: ui.borderRadius,

    '@selectors': {
      ':hover, :focus': {
        backgroundColor: color.accent.bgHover,
        outline: 'none',
      },
    },
  },

  item_focused: {
    backgroundColor: color.accent.bgHover,
  },

  item_readonly: {
    cursor: 'initial',
  },

  label: {
    flexGrow: 1,
  },

  checkmark: {
    position: 'absolute',
    left: 0.25 * unit + 1,
    top: ICON_SIZE / 2 + 1,
  },
});

export const styleSheetList: StyleSheet = ({ color, pattern, unit, ui }) => ({
  pane: {
    display: 'flex',
    borderRadius: ui.borderRadius,
  },

  pane_verticallyAlign: {
    overflowY: 'auto',
    borderRadius: 0,
  },

  pane_nested: {
    borderLeft: ui.border,
  },

  pane_verticallyOffset: {
    position: 'absolute',
    overflow: 'visible',
    top: 0,
    marginLeft: -2,
    transform: 'translateX(100%)',
    background: color.accent.bg,
    border: ui.border,
    boxShadow: ui.boxShadowMedium,
  },

  list: {
    flex: 1,
    listStyleType: 'none',
    padding: 0,
    margin: 0,
  },

  sectionHeader: {
    padding: `${1.5 * unit}px ${3 * unit}px`,
  },

  divider: {
    borderBottom: ui.border,
    marginTop: 0.5 * unit,
    marginBottom: 0.5 * unit,
  },

  aside: {
    flex: 1,
    alignItems: 'flex-start',
    overflow: 'auto',
    wordBreak: 'break-word',
  },

  asideButton: {
    ...pattern.resetButton,
    flex: 1,
    padding: unit * 2,
    textAlign: 'left',
    cursor: 'help',
  },

  row: {
    position: 'relative',
  },
});
