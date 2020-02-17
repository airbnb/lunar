import { StyleSheet } from '../../hooks/useStyles';

export const styleSheetMenu: StyleSheet = ({ color, ui, pattern, unit }) => ({
  menu: {
    ...pattern.box,
    margin: 0,
    padding: `${unit}px 0`,
    backgroundColor: color.accent.bg,
    listStyle: 'none',

    '@selectors': {
      '> li': {
        position: 'relative',
      },

      // These are jank. Better way?
      '> li:first-child > *': {
        borderTopLeftRadius: ui.borderRadius,
        borderTopRightRadius: ui.borderRadius,
      },

      '> li:last-child > *': {
        borderBottomLeftRadius: ui.borderRadius,
        borderBottomRightRadius: ui.borderRadius,
      },
    },
  },

  menu_scrollable: {
    overflowY: 'auto',
  },
});

export const styleSheetItem: StyleSheet = ({ color, font, pattern, unit, transition }) => ({
  item: {
    ...transition.box,
    ...font.textRegular,
    width: '100%',
    padding: `${unit}px ${1.5 * unit}px`,
    border: 0,
    textAlign: 'left',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    textDecoration: 'none',
    outlineOffset: '-3px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: color.accent.text,

    ':hover': {
      backgroundColor: color.accent.bgHover,
      color: color.core.neutral[6],
    },

    '@selectors': {
      // Fix content
      '> span': {
        flexGrow: 1,
      },

      // Fix icons
      '> div': {
        flexGrow: 0,
        margin: 0,

        ':first-child': { marginRight: unit },
        ':last-child': { marginLeft: unit },
      },
    },
  },

  item_spacious: {
    padding: unit * 2,
  },

  item_disabled: {
    ...pattern.disabled,
  },

  item_highlighted: {
    backgroundColor: color.accent.bgHover,
  },

  submenu: {
    position: 'absolute',
    top: -1,
    left: '99%',
  },
});

export const styleSheetRow: StyleSheet = ({ unit }) => ({
  item: {
    display: 'block',
    width: '100%',
    padding: unit,
    border: 0,
    textAlign: 'left',
  },

  item_spacious: {
    padding: unit * 2,
  },
});

export const styleSheetSeparator: StyleSheet = ({ color, unit }) => ({
  separator: {
    marginTop: unit,
    marginBottom: unit,
    padding: 0,
    border: 0,
    height: 1,
    background: color.accent.border,
  },
});
