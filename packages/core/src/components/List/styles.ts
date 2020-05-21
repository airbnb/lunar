import { StyleSheet } from '../../hooks/useStyles';

export const styleSheetList: StyleSheet = ({ unit }) => ({
  list: {
    display: 'flex',
    flexDirection: 'column',
    listStyle: 'none',
    margin: 0,
    padding: 0,
  },

  list_horizontal: {
    flexDirection: 'row',
  },

  list_gutter: {
    '@selectors': {
      '> li': {
        margin: `0 0 ${unit}px 0`,
      },

      '> li:last-child': {
        marginBottom: 0,
      },
    },
  },

  list_gutter_reversed: {
    '@selectors': {
      '> li': {
        margin: `${unit}px 0 0 0`,
      },

      '> li:last-child': {
        marginTop: 0,
      },
    },
  },

  list_gutter_horizontal: {
    '@selectors': {
      '> li': {
        margin: `0 ${unit * 2}px 0 0`,
      },

      '> li:last-child': {
        marginRight: 0,
      },
    },
  },

  list_gutter_horizontal_reversed: {
    '@selectors': {
      '> li': {
        margin: `0 0 0 ${unit * 2}px`,
      },

      '> li:last-child': {
        marginLeft: 0,
      },
    },
  },

  list_middleAlign: {
    alignItems: 'center',
  },

  list_reversed: {
    flexDirection: 'column-reverse',
  },

  list_reversed_horizontal: {
    flexDirection: 'row-reverse',
    justifyContent: 'flex-end',
  },

  list_wrap: {
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
