import { StyleSheet } from '../../hooks/useStyles';

export const styleSheetTabs: StyleSheet = ({ color, ui, unit }) => ({
  nav: {
    borderBottom: ui.borderThick,
    display: 'flex',
  },

  nav_noBorder: {
    borderColor: color.clear,
  },

  nav_secondary: {
    alignItems: 'center',
    borderWidth: 0,
  },

  panel: {
    marginTop: unit,
  },
});

export const styleSheetTab: StyleSheet = ({ color, font, pattern, unit, ui, transition }) => ({
  tab: {
    borderBottom: ui.borderThick,
    marginRight: unit * 4,
    marginBottom: -2,

    ':hover': {
      borderColor: color.accent.borderHover,
    },

    ':last-child': {
      marginRight: 0,
    },
  },

  tab_secondary: {
    marginRight: unit,
    borderWidth: 0,
    marginBottom: 0,
  },

  tab_noBorder: {
    borderColor: color.clear,
  },

  tab_selected: {
    borderColor: color.accent.borderActive,

    ':hover': {
      borderColor: color.accent.borderActive,
    },
  },

  tab_stretched: {
    flex: 1,
  },

  tab_disabled: {
    borderColor: color.accent.border,

    ':hover': {
      borderColor: color.accent.border,
    },
  },

  tab_noHover: {
    ':hover': {
      borderColor: color.clear,
    },
  },

  tabButton: {
    ...font.textReset,
    ...font.textRegular,
    ...transition.box,
    background: color.clear,
    color: color.accent.text,
    display: 'flex',
    alignItems: 'center',
    paddingTop: unit,
    paddingBottom: unit,
    border: 0,
    cursor: 'pointer',
    textAlign: 'left',
    textDecoration: 'none',
    whiteSpace: 'nowrap',
    width: '100%',
    fontWeight: font.weights.bold,
    borderTopLeftRadius: ui.borderRadius,
    borderTopRightRadius: ui.borderRadius,
  },

  tabButton_secondary: {
    ...pattern.regularButton,
    paddingTop: unit / 2,
    paddingBottom: (unit / 8) * 5,
    fontWeight: 'normal',
    justifyContent: 'center',
    border: `${ui.borderWidth}px solid ${color.clear}`,
    backgroundColor: color.clear,
    borderRadius: ui.borderRadius,
    ':hover': {
      borderColor: color.accent.borderHover,
      backgroundColor: color.core.neutral[1],
    },
  },

  tabButton_selected: {
    color: color.accent.textActive,
  },

  tabButton_secondary_selected: {
    borderColor: color.accent.borderActive,
    backgroundColor: color.accent.bg,
    ':hover': {
      borderColor: color.core.primary[4],
      backgroundColor: color.accent.bgHover,
    },
  },

  tabButton_disabled: {
    ...pattern.disabled,
    pointerEvents: 'none',
  },

  tabButton_small: {
    ...font.textSmall,
  },
});
