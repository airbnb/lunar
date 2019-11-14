import { StyleSheet } from '../../hooks/useStyles';

export const styleSheet: StyleSheet = ({ unit }) => ({
  list: {
    listStyle: 'none',
    margin: 0,
    padding: 0,
  },

  list_gutter: {
    '@selectors': {
      '> li': {
        marginBottom: unit,
      },

      '> li:last-child': {
        marginBottom: 0,
      },
    },
  },

  list_gutter_horizontal: {
    '@selectors': {
      '> li': {
        marginBottom: 0,
        marginRight: unit * 2,
      },

      '> li:last-child': {
        marginRight: 0,
      },
    },
  },

  list_horizontal: {
    display: 'flex',
  },

  list_middleAlign: {
    alignItems: 'center',
  },

  list_horizontal_wrap: {
    flexWrap: 'wrap',
  },
});

export const styleSheetItem: StyleSheet = ({ ui, unit }) => ({
  item_bordered: {
    borderTop: ui.border,

    ':last-child': {
      borderBottom: ui.border,
    },
  },

  item_bordered_horizontal: {
    borderLeft: ui.border,

    ':last-child': {
      borderRight: ui.border,
    },
  },

  item_compact: {
    paddingBottom: unit * 1.5,
    paddingTop: unit * 1.5,
  },

  item_compact_horizontal: {
    paddingLeft: unit * 1.5,
    paddingRight: unit * 1.5,
  },

  item_spacious: {
    paddingBottom: unit * 3,
    paddingTop: unit * 3,
  },

  item_spacious_horizontal: {
    paddingLeft: unit * 3,
    paddingRight: unit * 3,
  },
});
